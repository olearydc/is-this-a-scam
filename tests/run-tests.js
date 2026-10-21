/* Runs every test message through the checker in index.html.
   Usage: node tests/run-tests.js          (summary and failures)
          node tests/run-tests.js other.json  (a different set of messages)
          node tests/run-tests.js --all    (every message with its score)
   Scams must score 20 or more ("suspicious" or worse).
   Genuine messages must score under 20. */
var fs = require("fs"), path = require("path"), vm = require("vm");

var html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
// iPhones before iOS 16.4 can't parse a regex lookbehind, and one breaks the whole page there.
if (/\(\?<[!=]/.test(html)) { console.log("FAIL  index.html uses a regex lookbehind (?<! or (?<= : older iPhones can't run the page"); process.exitCode = 1; }
function between(a, b) {
  var i = html.indexOf(a), j = html.indexOf(b, i);
  if (i < 0 || j < 0) throw new Error("Could not find section: " + a);
  return html.slice(i, j);
}
// The checking code (lists, helpers, hidden details, analysis) uses no page elements.
var code = between("/* ================= reference lists", "/* ================= theme and code rain") +
  "\nvar QUIZ_BANK = " + between("/*QUIZ_BANK*/", "/*END_QUIZ_BANK*/").replace("/*QUIZ_BANK*/", "") + ";";
var box = { URL: URL };
vm.createContext(box);
vm.runInContext(code + "\nthis.analyse = analyse; this.inlineHeaderRegion = inlineHeaderRegion; this.QUIZ_BANK = QUIZ_BANK;", box);

// Known scam websites: a host passed in knownBad is flagged (alone or among a link's reasons); without it nothing changes.
(function () {
  var msg = "Your parcel is held, pay the fee at http://bad-example.top/x";
  function has(a) {
    return a.findings.some(function (f) {
      return (f.title === "Known scam website" && f.level === "high") ||
        (f.reasons || []).some(function (r) { return r.title === "Known scam website"; });
    });
  }
  if (!has(box.analyse(msg, null, ["bad-example.top"])) || has(box.analyse(msg, null))) { console.log("FAIL  known scam website check"); process.exit(1); }
})();

var file = process.argv.slice(2).filter(function (a) { return a[0] !== "-"; })[0];
var cases = JSON.parse(fs.readFileSync(file || path.join(__dirname, "messages.json"), "utf8"));
if (!file) box.QUIZ_BANK.forEach(function (q) { cases.push({ id: "quiz-" + q.id, scam: q.scam, msg: q.msg }); });

var all = process.argv.indexOf("--all") > -1, bad = 0, n = { scam: 0, genuine: 0 }, worstGenuine = 0, weakestScam = 100;
cases.forEach(function (c) {
  var a = box.analyse(c.msg, box.inlineHeaderRegion(c.msg));
  var ok = c.scam ? a.score >= 20 : a.score < 20;
  n[c.scam ? "scam" : "genuine"]++;
  if (c.scam) weakestScam = Math.min(weakestScam, a.score); else worstGenuine = Math.max(worstGenuine, a.score);
  if (!ok) bad++;
  if (!ok || all) {
    console.log((ok ? "  ok  " : "FAIL  ") + (c.scam ? "scam    " : "genuine ") + String(a.score).padStart(3) + "  " + c.id);
    if (!ok) a.findings.filter(function (f) { return f.level !== "info"; }).forEach(function (f) {
      console.log("          - " + f.title + " (" + f.level + ")" + (f.dest ? " -> " + f.dest : ""));
    });
  }
});
console.log("\n" + cases.length + " messages (" + n.scam + " scams, " + n.genuine + " genuine). " +
  "Lowest scam score " + weakestScam + ", highest genuine score " + worstGenuine + ".");
console.log(bad ? bad + " FAILED" : "All passed");
process.exit(bad ? 1 : 0);
