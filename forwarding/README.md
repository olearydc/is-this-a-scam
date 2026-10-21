# Forwarding service (WhatsApp first): plan and scaffold

**Status:** scaffold only. Nothing is live, and no accounts have been set up.

Someone gets a message they're unsure about. They forward it to our WhatsApp number, we check it with the same rules as the website, and we reply with what we found and what to do.

## Try it now (no accounts needed)

```
node forwarding/try-reply.js "An Post: pay the €2.99 fee at anpost-fee.top/pay"
DRY_RUN=1 node forwarding/server.js     # a pretend server that prints replies instead of sending them
```

| File | What it does |
| --- | --- |
| `checker.js` | Loads the rules straight out of `../index.html`, so website and WhatsApp always agree |
| `reply.js` | Builds the reply: verdict, top 3 signs, what to do. Links are made untappable (`anpost-fee[.]top`). Never says "safe" |
| `server.js` | Receives Meta's webhook, checks the signature, removes duplicates, limits use per person and per day, and replies. Message text is never saved or logged |
| `try-reply.js` | Shows the reply for any message, from the command line |

## Plan

| Phase | What | Cost | Who |
| --- | --- | --- | --- |
| 0 | Website: a "How to forward or copy a message" page with steps for iPhone and Android, tested on real phones | €0 | Build |
| 1 | **Check whether Dan can pass Meta business verification as an individual or sole trader in Ireland.** Do this first, because everything else depends on it | €0 (a CRO business name costs a small fee if needed) | Dan |
| 2 | A domain name (e.g. `isthisascam.ie`) and a privacy notice. The README must change from "nothing is sent anywhere" to "the website check sends nothing anywhere" | ~€10–30 a year | Dan + build |
| 3 | WhatsApp via Meta's Cloud API directly (no middleman), running on the netcup server behind HTTPS | €0 for up to 1,000 replies a month | Build, Dan sets up Meta |
| 4 | Email forwarding (forward the email, or "forward as attachment" to keep the hidden details) | ~€0–5 a month | Build |
| — | SMS forwarding: **not recommended.** No Irish numbers on Twilio, and each reply costs ~5× WhatsApp | | |

## Costs (WhatsApp, checked 21 Oct 2026)

- Since **1 October 2026**, Meta charges for replies, but **the first 1,000 replies a month per number are free.** Messages people send *to* us are free.
- With no payment card on the Meta account, replies simply stop after 1,000 a month. That's a free spending cap. Add a card only when needed.
- Beyond the free 1,000, reports put the Irish rate at about **$0.017 per reply**: about $34 a month at 3,000 checks, or $154 at 10,000. *Confirm this in the Meta dashboard; it comes from resellers' copies of Meta's rate card.*

## Pitfalls and how the design handles them

| Pitfall | What we do |
| --- | --- |
| Scammers copy the idea with a fake "Scam Check" number | Never message first. Never ask for anything. Publish the real number in one place only (website and leaflet). Say so in every reply |
| False reassurance | Never say "safe". The low-score reply says "no obvious warning signs, that does not mean it is safe" |
| A reply that contains the scam's link | Links are made untappable; only our own website link works |
| Most scams arrive as **SMS**, which can't be forwarded to WhatsApp easily (especially on iPhone) | Keep paste and screenshot on the website as the main route. The forwarding page explains copy and paste for texts |
| Forwarded WhatsApp messages hide who sent them | Sender rules can't work on WhatsApp. Text and link rules still do |
| Screenshots and voice notes | Reply "please use the website" for now. Screenshot reading on the server can come later |
| Costs running away, or spam | Per-person limit (10 a day) and a daily cap (500), with duplicates ignored |
| Meta's 2026 rule against general AI chatbots | This is a narrow, rule-based checker. Don't add an "ask me anything" AI chat. Dan should read the clause before launch |
| GDPR: forwarded messages contain personal data, sometimes other people's | Check in memory only, store nothing, log only the verdict. Write a privacy notice. Meta processes messages in the US, so say so |
| Verification may fail for an individual | Test it in Phase 1 before building more |

## Sample replies

Run `node forwarding/try-reply.js "<message>"` to see the real output. Example for a fake An Post text:

```
🔴 *This is very likely a scam.*

*What we found:*
• Risky link (anpost-fee[.]top)
• Rushing you
• Parcel problem

*What to do now:*
• Do not tap any links or reply.
• Do not ring any number in the message.
• Delete it. If it says it is from your bank or a company, contact them using a number you already have.

If you have already paid or given details, ring your bank straight away, then report it to your local Garda station.

We never message first and we never ask for money or details. More help: https://isthisascam.selfdestruct.online/
```

## Before going live (checklist)

- [ ] Meta business verification passed; display name approved
- [ ] A phone number that isn't used on the normal WhatsApp app (a cheap SIM is fine)
- [ ] Domain, HTTPS on the netcup server, webhook set up with `WA_VERIFY_TOKEN` and `WA_APP_SECRET`
- [ ] Privacy notice published; README promise updated
- [ ] Forwarding steps tested on a real iPhone and a real Android phone
- [ ] Meta's current rate card and AI-chatbot clause read by Dan
- [ ] A week of private testing with family before telling anyone else

Full research, with sources: `../research/whatsapp-plan.md` and `../research/r3-forwarding.md`.
