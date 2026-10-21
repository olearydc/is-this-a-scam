/* WhatsApp forwarding service (scaffold, not live yet).
   Someone forwards a message to our WhatsApp number; Meta sends it here as a webhook;
   we check it with the website's own rules and reply. Reply-only: it never messages first.

   Needs Node 18+ and these settings (environment variables):
     WA_TOKEN         access token for the WhatsApp Cloud API
     WA_PHONE_ID      the phone number ID from the Meta dashboard
     WA_VERIFY_TOKEN  any secret word, also typed into the Meta webhook settings
     WA_APP_SECRET    the app secret, used to prove a webhook really came from Meta
     PORT             default 8080 (put it behind HTTPS, e.g. Caddy or nginx)
     DAILY_CAP        replies per day for everyone, default 500 (1,000 a month are free)
     DRY_RUN=1        print replies instead of sending them

   Privacy: message text is checked in memory and never written to disk or logs. */
var http = require("http"), crypto = require("crypto");
var checker = require("./checker"), reply = require("./reply");

var GRAPH = "https://graph.facebook.com/" + (process.env.GRAPH_VERSION || "v23.0");
var DRY = process.env.DRY_RUN === "1";
var DAILY_CAP = +process.env.DAILY_CAP || 500;
var PER_PERSON = 10;                      // checks per person per day
var MAX_LEN = 5000;                       // longer messages are cut

var seen = new Map();                     // message id -> time, so Meta's retries get one reply
var today = "", sentToday = 0, perPerson = new Map();

function hash(s) { return crypto.createHash("sha256").update(String(s)).digest("hex").slice(0, 16); }
function log(event, extra) { console.log(new Date().toISOString(), event, extra ? JSON.stringify(extra) : ""); }

function allowed(from) {
  var d = new Date().toISOString().slice(0, 10);
  if (d !== today) { today = d; sentToday = 0; perPerson.clear(); }
  var k = hash(from), n = perPerson.get(k) || 0;
  if (sentToday >= DAILY_CAP || n >= PER_PERSON) return false;
  perPerson.set(k, n + 1); sentToday++;
  return true;
}

function send(to, body) {
  if (DRY) { console.log("---- reply to " + hash(to) + " ----\n" + body + "\n"); return Promise.resolve(); }
  return fetch(GRAPH + "/" + process.env.WA_PHONE_ID + "/messages", {
    method: "POST",
    headers: { "Authorization": "Bearer " + process.env.WA_TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to: to, type: "text", text: { body: body, preview_url: false } })
  }).then(function (r) { if (!r.ok) log("send-failed", { status: r.status }); });
}

function handle(m) {
  if (seen.has(m.id)) return;
  seen.set(m.id, Date.now());
  if (seen.size > 5000) seen.delete(seen.keys().next().value);
  if (!allowed(m.from)) { log("over-limit", { who: hash(m.from) }); return; }

  if (m.type !== "text") { log("not-text", { type: m.type }); return send(m.from, reply.NOT_TEXT); }
  var text = String(m.text && m.text.body || "").slice(0, MAX_LEN);
  if (/^\s*(hi|hello|help|start|menu|\?)\s*[.!]?\s*$/i.test(text)) return send(m.from, reply.HELP);

  var result = checker.check(text);
  log("checked", { verdict: result.verdict, score: result.score, forwarded: !!(m.context && m.context.forwarded) });
  return send(m.from, reply.build(result, { frequentlyForwarded: !!(m.context && m.context.frequently_forwarded) }));
}

function validSignature(raw, header) {
  if (!process.env.WA_APP_SECRET) return DRY;          // only skip the check when testing locally
  var want = "sha256=" + crypto.createHmac("sha256", process.env.WA_APP_SECRET).update(raw).digest("hex");
  var got = String(header || "");
  return got.length === want.length && crypto.timingSafeEqual(Buffer.from(got), Buffer.from(want));
}

http.createServer(function (req, res) {
  var url = new URL(req.url, "http://localhost");
  if (url.pathname !== "/webhook") { res.writeHead(404); return res.end(); }

  // Meta checks the webhook once when you set it up
  if (req.method === "GET") {
    var ok = url.searchParams.get("hub.mode") === "subscribe" && url.searchParams.get("hub.verify_token") === process.env.WA_VERIFY_TOKEN;
    res.writeHead(ok ? 200 : 403); return res.end(ok ? url.searchParams.get("hub.challenge") : "");
  }
  if (req.method !== "POST") { res.writeHead(405); return res.end(); }

  var chunks = [], size = 0;
  req.on("data", function (c) { size += c.length; if (size > 1e6) req.destroy(); else chunks.push(c); });
  req.on("end", function () {
    var raw = Buffer.concat(chunks);
    if (!validSignature(raw, req.headers["x-hub-signature-256"])) { res.writeHead(401); return res.end(); }
    res.writeHead(200); res.end();                     // answer Meta straight away, then do the work
    var body; try { body = JSON.parse(raw); } catch (e) { return; }
    (body.entry || []).forEach(function (e) {
      (e.changes || []).forEach(function (c) {
        ((c.value && c.value.messages) || []).forEach(function (m) {
          Promise.resolve(handle(m)).catch(function (err) { log("error", { msg: err.message }); });
        });
      });
    });
  });
}).listen(+process.env.PORT || 8080, function () { log("listening", { port: +process.env.PORT || 8080, dryRun: DRY }); });
