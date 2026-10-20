# Is This a Scam? — project notes

Working notes for Dan's project. Written in plain English so they are easy to pick up in VS Code later.

## What it is

A free, single web page that helps people, especially older people, check whether an email or text message is a scam. You paste the message (or a screenshot of it), watch it being checked, and get a clear answer with simple steps on what to do.

It started as the course project for QQI Level 5 *Enhancing Productivity with AI* (5N22966), assessment PR1: "A project to develop practical applications of GenAI".

## Links

| What | Where |
| --- | --- |
| Live page | https://olearydc.github.io/is-this-a-scam/ |
| Source code | https://github.com/olearydc/is-this-a-scam |
| Course demo page (Phish Scan, with the V1/V2/V3 prompt builder) | In Claude, as a private artifact |
| Course project file (plan, build log, notes per step) | In Claude, as a private doc |
| Printable A4 leaflet with QR code | In Claude, as a private design |

## Files in this repository

| File | What it does |
| --- | --- |
| `index.html` | The whole tool: page, styles, scam checks, quiz and everything else, in one file |
| `manifest.webmanifest` | Lets it be added to a phone's home screen, and makes Android's Share menu work |
| `sw.js` | Small offline helper, so the page opens without a connection |
| `icon-180.png`, `icon-192.png`, `icon-512.png` | App icons |
| `README.md` | Public description for GitHub |
| `PROJECT-NOTES.md` | This file |

## How the checker works

Everything runs in the browser. Nothing is sent anywhere unless the person chooses to ask an AI.

1. **The message is split into parts:** the sender (the From line), links, email addresses, and the words.
2. **Rules look for warning signs.** Each rule has a title, a plain-English reason, and a strength:

   | Strength | Shown as | Points |
   | --- | --- | --- |
   | high | Strong warning | 25 |
   | medium | Warning | 12 |
   | low | Small sign | 5 |
   | info | Good to know | 0 |

   One special case: an email that fails its identity check in the hidden details counts 40.
3. **The points add up to a score out of 100:**

   | Score | Answer shown |
   | --- | --- |
   | 50 or more | This is very likely a scam |
   | 20 to 49 | This looks suspicious |
   | under 20 | No obvious warning signs found (never "safe") |

### What it checks

- **Sender:** look-alike addresses (numbers for letters), names that don't match the address, free email accounts pretending to be a company, risky endings (.top, .xyz and so on)
- **Links:** link goes to a different website from the sender or the company named, disguised links, shortened links, no https, free hosting sites (vercel.app, github.io and so on), look-alike letters. Several warnings about one link are shown as one "Risky link" card.
- **Pressure:** urgency, threats, "account locked", unusual activity alerts, password expiry, toll and fine notices
- **What it asks for:** passwords, codes, bank details, personal details, gift cards, crypto, small fees, "safe account" transfers, changed bank details, secrecy, remote access apps
- **Too good to be true:** prizes, grants, refunds, loans, investments with unrealistic returns
- **Hidden tricks:** invisible characters inside words, letters from other alphabets
- **Hidden details (optional):** pasted email headers, checking the identity checks (DMARC, SPF, DKIM) and the reply address
- **Irish scams:** An Post and customs fees, Revenue refunds, M50 tolls, fake Gardaí, "Hi Mum" texts

The rules live in the `RULES` list and the `analyse()` function in `index.html`.

## Features

- Calm, light page with large readable text and text-size buttons
- Live scan: each warning lights up in the message as it is found
- Page darkens during the scan, then returns to light with a soft red border (very likely a scam) or amber (suspicious)
- Optional full "Matrix effect" for demos
- Findings grouped by how serious they are, with a "Real website" line for links
- "What to do now" and "How to report it" (Garda, CCPC and gov.ie advice)
- Read aloud, Start again
- Paste in one tap, paste or drop a screenshot (text read on the device)
- Add to home screen, works offline, Android "Share to" from WhatsApp and Messages
- Send the result to someone: share, email, copy, save, print. Links and addresses in the shared copy are switched off, with the reason.
- Second opinion from an AI: one click inside Claude, copy-and-paste for ChatGPT, Copilot or Claude elsewhere
- Practise quiz: 8 random questions per round from a bank of practice messages, remembering which have been seen

## Decisions

- **Never say "safe".** A scam that slips through and gets a green tick is worse than no tool.
- **No server for the course version.** Everything runs in the browser. Website-age and scam-list checks need a server, so they are a later option.
- **Made-up examples only.** No real emails, names or work data in the project. Real scams used for testing had personal details removed first.
- **Shared results are made safe.** Links and addresses are switched off so family members can't open them by mistake.
- **Calm design for older users.** The Matrix look is optional, not the default.

## Testing

Test messages used so far: 29 (16 scams, 12 genuine, plus one with unreadable hidden details).

- Every scam scores "suspicious" or higher.
- Every genuine message scores 12 or less.
- Accessibility: the axe checker finds no problems on the start page, result page or quiz. Every text colour meets the WCAG AA contrast standard.

After any change to the rules, re-run the test messages and check nothing has moved.

## How to update the live page

1. Edit `index.html`.
2. In `sw.js`, bump the cache name (for example `itas-v10` to `itas-v11`) so phones pick up the new version.
3. Commit and push to `main`. GitHub Pages updates within a minute or two.

## Ideas for later

- Website age and known scam-list checks, using a small server (for example on the netcup server)
- A WhatsApp number people can forward a message to, which replies with the answer (needs a server and WhatsApp's business service)
- A proper domain name once real people use it
- Watch two or three older people use it without help, and fix what confuses them
- A demo video for the course
- Questions written fresh by an AI each time (only works inside Claude; lessons can't be checked in advance)

## Course project: which step each part supports

| Step | Marks | Evidence from this project |
| --- | --- | --- |
| 1. GenAI concepts | 10% | Contrast between the rule-based checker and the AI second opinion |
| 2. Task and problem | 20% | Phishing awareness for older people; text, images (screenshots) and the leaflet |
| 3. Prompt crafting | 20% | V1 casual, V2 RISE and V3 CLEAR prompts in Phish Scan |
| 4. Ethics and law | 20% | No real data, GDPR, links switched off when sharing, never saying "safe", reporting advice from official sources |
| 5. Impact and limits | 20% | The IMF email first scored "safe"; the An Post look-alike link; false alarms fixed after AI review |
| 6. Reflection | 10% | The build log in the course project file |

The written answers for each step must be in Dan's own words.
