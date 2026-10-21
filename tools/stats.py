#!/usr/bin/env python3
"""Turns the usage tally into site/stats.json. Runs on the server every 10 minutes (cron).

Each tally line is just "<time> /count/<kind>" (see nginx.conf). Nothing else is ever recorded.
"""
import json, os, sys
from collections import Counter, defaultdict
from datetime import datetime, timezone

BASE = os.path.dirname(os.path.abspath(__file__))
LOG = os.path.join(BASE, "counts", "counts.log")
OUT = os.path.join(BASE, "site", "stats.json")
KINDS = ["check-high", "check-mid", "check-none", "quiz", "leaflet"]

totals, days = Counter(), defaultdict(Counter)
if os.path.exists(LOG):
    with open(LOG, encoding="utf-8", errors="replace") as f:
        for line in f:
            parts = line.split()
            if len(parts) != 2 or not parts[1].startswith("/count/"):
                continue
            kind = parts[1][7:]
            if kind in KINDS:
                totals[kind] += 1
                days[parts[0][:10]][kind] += 1

recent = sorted(days)[-30:]
stats = {
    "checks": totals["check-high"] + totals["check-mid"] + totals["check-none"],
    "warned": totals["check-high"] + totals["check-mid"],
    "likelyScam": totals["check-high"],
    "suspicious": totals["check-mid"],
    "noSigns": totals["check-none"],
    "quizRounds": totals["quiz"],
    "leafletPrints": totals["leaflet"],
    "days": [dict(date=d, **{k: days[d][k] for k in KINDS}) for d in recent],
    "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
}
tmp = OUT + ".tmp"
with open(tmp, "w", encoding="utf-8") as f:
    json.dump(stats, f, separators=(",", ":"))
os.replace(tmp, OUT)
