/* Turns a check result into a short, plain WhatsApp reply.
   Rules: never say "safe", never repeat the message back, never send a working link
   except our own website, keep it short enough to read on a phone. */
var SITE = process.env.SITE_URL || "https://isthisascam.selfdestruct.online/";

/* "anpost-fee.top/pay" becomes "anpost-fee[.]top/pay" so WhatsApp can't make it tappable */
function defuse(s) {
  return String(s).replace(/https?:\/\//gi, "").replace(/\./g, "[.]");
}

var HEAD = {
  scam: "🔴 *This is very likely a scam.*",
  suspicious: "🟠 *This looks suspicious.*",
  unclear: "⚪ *We found no obvious warning signs.*\nThat does not mean it is safe. Scams can be hard to spot."
};

var TODO = {
  scam: [
    "Do not tap any links or reply.",
    "Do not ring any number in the message.",
    "Delete it. If it says it is from your bank or a company, contact them using a number you already have."
  ],
  suspicious: [
    "Do not tap any links or reply yet.",
    "Check with the company or person yourself, using a number you already have.",
    "Ask someone you trust before you do anything."
  ],
  unclear: [
    "If it asks for money, codes or details, check with the person or company yourself first.",
    "Never share a code, password or PIN."
  ]
};

function build(result, opts) {
  opts = opts || {};
  var lines = [HEAD[result.verdict], ""];
  if (result.warnings.length) {
    lines.push("*What we found:*");
    result.warnings.slice(0, 3).forEach(function (f) {
      lines.push("• " + f.title + (f.dest ? " (" + defuse(f.dest) + ")" : ""));
    });
    if (result.warnings.length > 3) lines.push("…and " + (result.warnings.length - 3) + " more.");
    lines.push("");
  }
  if (opts.frequentlyForwarded) lines.push("This message has been forwarded many times. Chain messages are often used to spread scams.", "");
  lines.push("*What to do now:*");
  TODO[result.verdict].forEach(function (t) { lines.push("• " + t); });
  lines.push("", "If you have already paid or given details, ring your bank straight away, then report it to your local Garda station.");
  lines.push("", "We never message first and we never ask for money or details. More help: " + SITE);
  return lines.join("\n");
}

var HELP = [
  "Hello! This is *Is This a Scam?*",
  "",
  "Forward us a message you are not sure about and we will check it for the tricks scammers use.",
  "",
  "To forward on WhatsApp: press and hold the message, tap *Forward* (the arrow), choose this chat and tap *Send*.",
  "",
  "We never message first and we never ask for money or details. Please don't send us your own passwords or bank details.",
  "More help: " + SITE
].join("\n");

var NOT_TEXT = "Sorry, we can only check written messages here for now. For a screenshot, please use our website: " + SITE;

module.exports = { build: build, defuse: defuse, HELP: HELP, NOT_TEXT: NOT_TEXT };
