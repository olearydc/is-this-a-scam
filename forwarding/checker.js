/* Loads the checking rules straight out of ../index.html, so the website and
   the forwarding service always give the same answer. */
var fs = require("fs"), path = require("path"), vm = require("vm");

function load() {
  var html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  var a = html.indexOf("/* ================= reference lists"), b = html.indexOf("/* ================= theme and code rain");
  if (a < 0 || b < 0) throw new Error("Could not find the checking code in index.html");
  var box = { URL: URL };
  vm.createContext(box);
  vm.runInContext(html.slice(a, b) + "\nthis.analyse = analyse; this.inlineHeaderRegion = inlineHeaderRegion; this.PTS = PTS;", box);
  return box;
}

var box = load();

/* Same thresholds as the page: 50+ very likely, 20+ suspicious, otherwise no obvious signs (never "safe"). */
function check(text) {
  var a = box.analyse(text, box.inlineHeaderRegion(text));
  var warnings = a.findings.filter(function (f) { return f.level !== "info"; })
    .sort(function (x, y) { return (y.pts || box.PTS[y.level]) - (x.pts || box.PTS[x.level]); });
  return { score: a.score, verdict: a.score >= 50 ? "scam" : a.score >= 20 ? "suspicious" : "unclear", warnings: warnings };
}

module.exports = { check: check };
