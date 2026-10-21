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
SCAM_KINDS = ["parcel", "bank", "gov", "family", "money", "job", "tech", "bills", "shopping", "romance", "other"]

totals, days, scam_days = Counter(), defaultdict(Counter), defaultdict(Counter)
if os.path.exists(LOG):
    with open(LOG, encoding="utf-8", errors="replace") as f:
        for line in f:
            parts = line.split()
            if len(parts) != 2 or not parts[1].startswith("/count/"):
                continue
            kind, day = parts[1][7:], parts[0][:10]
            scam = None
            for base in ("check-high-", "check-mid-"):
                if kind.startswith(base) and kind[len(base):] in SCAM_KINDS:
                    kind, scam = base[:-1], kind[len(base):]
            if kind in KINDS:
                totals[kind] += 1
                days[day][kind] += 1
                if scam:
                    scam_days[day][scam] += 1

recent = sorted(days)[-30:]
kinds30 = Counter()
for d in recent:
    kinds30.update(scam_days[d])
stats = {
    "checks": totals["check-high"] + totals["check-mid"] + totals["check-none"],
    "warned": totals["check-high"] + totals["check-mid"],
    "likelyScam": totals["check-high"],
    "suspicious": totals["check-mid"],
    "noSigns": totals["check-none"],
    "quizRounds": totals["quiz"],
    "leafletPrints": totals["leaflet"],
    "kinds30": {k: kinds30[k] for k in SCAM_KINDS if kinds30[k]},
    "days": [dict(date=d, **{k: days[d][k] for k in KINDS}) for d in recent],
    "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
}
tmp = OUT + ".tmp"
with open(tmp, "w", encoding="utf-8") as f:
    json.dump(stats, f, separators=(",", ":"))
os.replace(tmp, OUT)
