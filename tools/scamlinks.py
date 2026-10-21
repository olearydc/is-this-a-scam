#!/usr/bin/env python3
"""Builds the privacy-preserving list of known scam websites. Runs on the server every 6 hours (cron).

Downloads three public lists (OpenPhish, URLhaus, Phishing Army), keeps only website names (hosts),
drops shared platforms where anyone can publish content, and writes site/scamlinks/<xx>.json.
Each file holds the first 16 hex characters of SHA-256(host) for hosts whose hash starts with <xx>.
The page asks for one small file based on that scrambled code, so the server never learns which
website was checked. If any download fails, the previous output is left untouched.

Optional: SCAMLINKS_BASE=<folder> overrides the folder that holds site/ (default: this script's folder).
Optional: SCAMLINKS_SRC_<NAME>=<path or url> overrides a source (OPENPHISH, URLHAUS, PHISHINGARMY), for testing.
"""
import hashlib, json, os, re, sys, urllib.request
from datetime import datetime, timezone

BASE = os.environ.get("SCAMLINKS_BASE") or os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(BASE, "site", "scamlinks")

SOURCES = [
    ("OpenPhish", "https://openphish.com/feed.txt"),
    ("URLhaus", "https://urlhaus.abuse.ch/downloads/text_online/"),
    ("Phishing Army", "https://phishing.army/download/phishing_army_blocklist.txt"),
]

# Shared or legitimate platforms where anyone can host content. A host equal to, or a sub-domain of,
# any of these is dropped, so a genuine site is never called a scam because one page on it was abused.
# Deliberately NOT here: firebaseapp.com, web.app, github.io, vercel.app, netlify.app, pages.dev,
# workers.dev, blogspot.com. Those give every site its own sub-domain, so listing the exact
# sub-domain (e.g. bad-shop.web.app) is accurate and does not affect anyone else.
# amazonaws.com is on the list: bucket hosts (x.s3.amazonaws.com) are shared infrastructure, so all dropped.
ALLOW = """google.com googleusercontent.com goo.gl forms.gle sites.google.com docs.google.com drive.google.com
dropbox.com dropboxusercontent.com onedrive.live.com 1drv.ms sharepoint.com microsoft.com live.com office.com
apple.com icloud.com amazon.com amazonaws.com github.com githubusercontent.com facebook.com instagram.com
whatsapp.com t.me telegram.org youtube.com linkedin.com x.com twitter.com bit.ly tinyurl.com wa.me
ipfs.io cloudflare-ipfs.com selfdestruct.online""".split()

HOST_RE = re.compile(r"^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$")


def allowed(h):
    return any(h == a or h.endswith("." + a) for a in ALLOW)


def clean_host(s):
    h = s.strip().lower()
    if "://" in h:
        h = h.split("://", 1)[1]
    h = re.split(r"[/?#]", h, maxsplit=1)[0]
    if "@" in h:
        h = h.rsplit("@", 1)[1]
    h = re.sub(r":\d*$", "", h).rstrip(".")
    if h.startswith("www."):
        h = h[4:]
    if not HOST_RE.match(h) or len(h) > 253:
        return None
    return h


def fetch(name, url):
    override = os.environ.get("SCAMLINKS_SRC_" + re.sub(r"\W", "", name).upper())
    url = override or url
    if "://" not in url:
        with open(url, encoding="utf-8", errors="replace") as f:
            return f.read()
    req = urllib.request.Request(url, headers={"User-Agent": "is-this-a-scam-list-builder"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", errors="replace")


hosts, used = set(), []
try:
    for name, url in SOURCES:
        before = len(hosts)
        for line in fetch(name, url).splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            h = clean_host(line.split()[0])
            if h and not allowed(h):
                hosts.add(h)
        if len(hosts) == before:
            raise ValueError(name + " gave no hosts")
        used.append(name)
except Exception as e:
    print("scamlinks: failed (%s); previous list kept" % e, file=sys.stderr)
    sys.exit(1)

buckets = {"%02x" % i: [] for i in range(256)}
for h in hosts:
    d = hashlib.sha256(h.encode("utf-8")).hexdigest()
    buckets[d[:2]].append(d[:16])

os.makedirs(OUT, exist_ok=True)


def write(name, obj):
    path = os.path.join(OUT, name)
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(obj, f, separators=(",", ":"))
    os.chmod(tmp, 0o644)
    os.replace(tmp, path)


for k, v in buckets.items():
    write(k + ".json", sorted(set(v)))
write("meta.json", {"updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"), "count": len(hosts), "sources": used})
print("scamlinks: %d websites from %s in 256 files" % (len(hosts), ", ".join(used)))
