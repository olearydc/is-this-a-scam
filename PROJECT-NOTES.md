# Is This a Scam? — project notes

Working notes for Dan's project. Written in plain English so they are easy to pick up in VS Code later.

## What it is

A free, single web page that helps people, especially older people, check whether an email or text message is a scam. You paste the message (or a screenshot of it), watch it being checked, and get a clear answer with simple steps on what to do.

It started as the course project for QQI Level 5 *Enhancing Productivity with AI* (5N22966), assessment PR1: "A project to develop practical applications of GenAI".

## Links

| What | Where |
| --- | --- |
| Live page | https://isthisascam.selfdestruct.online/ (own server, Coolify) |
| Old live page | https://olearydc.github.io/is-this-a-scam/ (down while the GitHub account is flagged) |
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
| `fonts/` | The page's two fonts and their licences, so nothing loads from Google |
| `ocr/` | The screenshot reader (tesseract.js 5.1.1) and its English data, so nothing loads from a CDN |
| `tests/run-tests.js`, `tests/messages.json` | Runs every test message through the checker (see Testing) |
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

- Calm, light page with large readable text and text-size buttons (they scale from the size set on the phone or browser)
- "What happened?" after a warning result: I only read it / I tapped a link or replied / I paid or gave a code. Each has its own Irish steps, "It's not your fault", and support lines. Numbers only from `research/review-2026-10-21/verified-numbers.md`
- One bold "main action" line under the verdict; a short trust note on the start page ("This page never asks for your bank details, codes or passwords")
- Printable A4 leaflet at `leaflet.html`, linked from the footer
- Screen-reader friendly: skip link, quiz feedback announced, warning highlights shown by underline style as well as colour, works in high-contrast mode
- Live scan: each warning lights up in the message as it is found
- Page darkens during the scan, then returns to light with a soft red border (very likely a scam) or amber (suspicious)
- Optional full "Matrix effect" for demos
- Findings grouped by how serious they are, with a "Real website" line for links
- "What to do now" and "How to report it" (Garda, CCPC and gov.ie advice)
- Read aloud, Start again
- Paste in one tap, paste or drop a screenshot (text read on the device)
- Add to home screen, works offline, Android "Share to" from WhatsApp and Messages
- Send the result to someone: share, email, copy, save, print. Links and addresses in the shared copy are switched off, with the reason.
- "Someone is on the phone to you" page: hang up, wait or use another phone, ring back on a number you find yourself, the never-do list (Garda advice)
- "What they're probably after" line on warning results (`WANTS` list in `index.html`)
- A trusted helper saved on the phone only (`itas-helper` in local storage): one tap to WhatsApp, text or ring them
- "How do I copy a message from my phone?" help for iPhone, Android, WhatsApp, email and screenshots
- Second opinion from an AI: one click inside Claude, copy-and-paste for ChatGPT, Copilot or Claude elsewhere
- "A warning says you have a virus" page: don't ring, hold Esc, close the browser or switch off, what to do if you already rang them
- Useful Irish numbers on the report section (checked 21 October 2026): 999/112, Garda Confidential 1800 666 111, CCPC 01 402 5555, Age Action 01 475 6989. Link to FraudSMART's ScamChecker (`fraudsmart.scamchecker.ie`; `www.scamchecker.ie` had a broken certificate) for checking a website address
- Practise quiz: 8 random questions per round (5 scams, 3 genuine) from a bank of 106 made-up messages, tagged by type, topic and difficulty, remembering which have been seen. Kind wording on wrong answers ("This one is hard to spot"). A 3-message refresher is offered on the start page once a week has passed since the last round (`itas-last` in local storage)

## Decisions

- **Never say "safe".** A scam that slips through and gets a green tick is worse than no tool.
- **No server for the course version.** Everything runs in the browser. Website-age and scam-list checks need a server, so they are a later option.
- **Made-up examples only.** No real emails, names or work data in the project. Real scams used for testing had personal details removed first.
- **Shared results are made safe.** Links and addresses are switched off so family members can't open them by mistake.
- **Calm design for older users.** The Matrix look is optional, not the default.

## Testing

Run all the test messages with one command (needs Node.js):

```
node tests/run-tests.js            # summary and any failures
node tests/run-tests.js --all      # every message with its score
node tests/run-tests.js other.json # try a new batch of messages
```

It loads the checking code straight out of `index.html`, so it always tests the real rules. Scams must score 20 or more, genuine messages under 20.

The messages are in `tests/messages.json` plus the 106 quiz messages: 454 in all, 232 scams and 222 genuine. Lowest scam score 24, highest genuine score 17.

How they were built (21 October 2026):
- Hand-made realistic messages, including the false alarms found in the review.
- Two "blind" batches written by AI helpers that were not allowed to see the rules. This is the honest test, because rules can't be tuned to messages nobody has seen yet.
  - First blind batch (60): 11 of 30 genuine messages wrongly flagged, 4 of 30 scams missed.
  - Second blind batch (80), after fixing the first: 2 of 40 genuine flagged, 12 of 40 scams missed.
  - Both were then fixed and added to the saved tests.
  - Third blind batch (80), later on 21 October: 14 of 40 scams missed, 5 of 40 genuine flagged. Most misses had no link and asked you to reply or ring a number. The false alarms included real bugs: gov.ie treated as a fake government site, and Bord Gáis's real address flagged. Fixed with general rules (ring-a-number-about-a-problem, reply-to-activate-link, money-back "recovery" offers, money mules, crime accusations) and 79 added to the tests. One left out: a "wrong number" opener ("Hi Tom, are we still on for lunch?") looks exactly like a real message, so no rule can catch it without false alarms.
  - Known trade-off: an email linking to 3 or more different websites is treated like a newsletter and doesn't get "Link goes somewhere else". Phishing emails built that way still scored 100 from other signs.
- Lesson: a rule-based checker always misses some new scams. Every new blind batch finds a few. Keep doing a blind batch every so often, and keep the "never say safe" rule.

Accessibility: the axe checker finds no problems on the start page, result page or quiz. Every text colour meets the WCAG AA contrast standard.

After any change to the rules, run `node tests/run-tests.js` and check everything still passes.

## How to update the live page

1. Edit `index.html`.
2. In `sw.js`, bump the cache name (for example `itas-v16` to `itas-v17`) so phones pick up the new version.
3. Commit, then run `sh deploy.sh`. It runs the tests, copies the site files to the server and reloads nginx. The change is live straight away.
4. Push to GitHub as a backup (`git push`).

**Hosting (21 October 2026):** the site runs on the netcup server at `159.195.243.30` under Coolify, as a Docker Compose service in the "Is This a Scam" project (one nginx container). The files live in `/home/deploy/sites/is-this-a-scam/` (`site/` plus `nginx.conf`); SSH as `deploy` with the `self_destruct_hetzner` key. Coolify handles the domain and the HTTPS certificate. `nginx.conf` sets strict security headers (nothing may load from other websites). `Dockerfile` also exists, for building an image from the repo once Coolify can read GitHub again.

**GitHub account flagged (21 October 2026):** GitHub hid the `olearydc` account (profile, repos and Pages show 404 when logged out, Actions disabled), probably an automated anti-phishing match on the realistic fake scam messages. Support ticket #4886841. Pushing still works, so GitHub stays the backup. Deploy keys and the Coolify GitHub App can't read the repo while it's flagged.

## Known problems to fix

Found in a review on 20 October 2026. **All fixed on 21 October 2026:**
1. `sw.js` now answers shared messages from the saved copy without going online, and never saves an address with a message in it. Tested in Chrome: the server saw no request containing the message, and nothing was cached.
2. False alarms fixed: social media links, "link goes somewhere else" counted once, company names only count with a request or pressure, bait words in sender addresses need a hyphen. Many more fixes came from the blind tests (see Testing).
3. Test messages saved in `tests/`, run with one command.
4. Screenshot reader loads with an integrity check; `summary()` sorts once. (Its worker files still load from the CDN without a check, which the library doesn't support.)

Second review on 21 October 2026 (usability for older users, code and privacy, research). Fixed the same day:
- "Check this message" now sits straight under the box; "How do I copy" help sits above it.
- "No warning signs" results get a calmer to-do list instead of the scam one.
- No more harsh black box around headings after they get focus.
- Very long messages are cut to 20,000 characters. A 100 KB message used to freeze the page for about 4 seconds.
- Phone-number links are bigger to tap. `<title>` moved into `<head>`, with a no-referrer setting.
- `sw.js`: falls back to the saved copy after 4 seconds on a weak connection; only page loads with a message in the address are answered offline.

Also done the same day:
- The screenshot reader is served from this site (`ocr/`, about 11 MB, tesseract.js 5.1.1 with the smaller "best_int" English data). Fonts are served from `fonts/` (SIL Open Font Licence files included). The page now contacts no other website at all. Tested: OCR read a screenshot correctly, and the only host contacted was the site itself.
- The Matrix button moved from the top bar to the footer. The "1, 2, 3 how it works" steps were removed from the start page.
- Plainer wording for the "macros" and "padlock" warnings.

Still to remember:
- Never say a text without a "Likely SCAM" label is genuine: ComReg's label is live, but blocking unregistered senders was postponed.
- The OCR files are not in the offline cache (too big), so reading screenshots needs a connection the first time.

Original notes, kept for the record:

1. **Shared messages go online (privacy).** Android "Share to" puts the whole message in the web address (`?text=...`). `sw.js` tries the network first, so the address, message included, reaches GitHub's servers. It also saves a copy of every page it loads, so the message stays stored on the phone. That breaks the promise "Nothing you paste is sent anywhere". The page clears the address bar afterwards, but by then it has already been sent and saved.
   - *Fix:* in `sw.js`, answer shared messages from the saved copy of the page without going online, and never store addresses that contain a message.
2. **False alarms on genuine messages.** The test messages pass, but realistic genuine ones don't:
   - A shop newsletter with Facebook, Instagram and Twitter links scored 75 ("very likely a scam"). Each link to a different website adds 25 points.
   - An accountant's email saying "Revenue for Q3 is up 4%" scored 37. The word "revenue" counts as the tax office, so any other link is flagged.
   - "Hi Mum, saw that book on Amazon" with a newspaper link scored 30. Mentioning Amazon makes any non-Amazon link a strong warning.
   - Bait words in sender addresses match inside real names: "pay" in paypal.com, "fee" in coffee, "account" in byrneaccounts.ie.
   - *Fix:* count "link goes somewhere else" once per message and ignore well-known sites like social media. Only count a company mention when the message also asks for money, a login or personal details. Only flag bait words in a sender address when it has a hyphen, as the link check already does.
3. **The test messages aren't saved in the repository.** Add them, plus realistic genuine messages like the ones above, with a small script that runs them all. Then "re-run the test messages" takes one command.
4. **Smaller points.**
   - The screenshot reader (tesseract.js) loads from a CDN without an integrity check. Add one.
   - `summary()` sorts the findings twice.

## Deep review, 21 October 2026 (afternoon)

Six AI agents in parallel: competitor sites, research on older users and scam psychology, an Irish accuracy check, blind batch #4 (80 messages, partly from published real scams), a full functional test in Chrome, Firefox and WebKit, and an accessibility audit. Reports are in `research/review-2026-10-21/`.

Fixed straight away: the page did not load at all on iPhones before iOS 16.4 (a regex lookbehind; the test runner now fails if one appears); shared messages could be written to the server log (nginx access log now off); shared results linked to the dead github.io address.

Then built: rule fixes for blind batch #4 (10 missed scams, 3 false alarms; one loophole closed by hand), the accessibility fixes, and the help journeys above.

Ideas kept for later: website-age and reputation checks for links (would need the server, sends only the domain); forward-an-email-to-check (breaks "nothing leaves your phone", needs a privacy notice; Singapore's version saw little use); a channel picker for letters and doorstep scams; real tests with two or three older people.

## Getting the message in (21 October 2026)

Testing on Dan's Samsung Galaxy Z Fold7 showed the problem: Samsung Messages offers "Forward" and "Copy text", not "Share", and Chrome's "Add to home screen" is hidden further down a long menu. If this is fiddly, older people won't use it.

Done: "Paste and check" is now one big button that pastes and checks straight away (and "Check a screenshot" checks straight away too). Instructions mention Samsung wording and scrolling the Chrome menu.

Decided: no forwarding service yet (Dan, 21 October 2026), to keep "nothing leaves your phone". If it comes back: a text (SMS) number matches what Samsung users see ("Forward"); WhatsApp needs Meta verification; email is cheapest but doesn't help with texts.

## Goal: passing a message on without copying and pasting

**Update 21 October 2026:** a full plan and a working scaffold for WhatsApp forwarding are in `forwarding/README.md`, with the research in `research/`. Correction to the table below: WhatsApp replies are **no longer free**. Since 1 October 2026 Meta gives 1,000 free replies per number per month, then charges about $0.017 each. Ranked website improvements from the research are in `research/README.md`.

Copying, pasting and taking screenshots are hard for many older people. Forwarding a message is something they already know how to do, and it's safer: they never have to tap inside the scam message. This is the main thing to aim for.

Options, from easiest to hardest:

| Option | How it works for the person | What it needs | Notes |
| --- | --- | --- | --- |
| **Android "Share to"** (already built) | Press and hold the message, tap Share, choose "Is This a Scam?" | Nothing more, once problem 1 is fixed | Only works after adding the page to the home screen. Not possible on iPhone |
| **iPhone Shortcut** | Press and hold, tap Share, choose "Check for scams" | A ready-made Apple Shortcut that opens the page with the message | No server. Put the message after a `#` in the address, so it is never sent online. Someone has to install the shortcut once, maybe a family member |
| **Forward by email** | Forward the email to an address such as `check@...` and get a reply with the answer | A small server or email service (for example on the netcup server) and a domain name | Forwarding "as attachment" also brings the hidden details, so the identity checks work |
| **Forward on WhatsApp** | Forward the message to a "Scam Check" WhatsApp contact and get a reply | A server, WhatsApp's business service (Meta business check) and a phone number | Probably the most useful for older people. Replies to messages people send in are currently free, but check WhatsApp's prices first |
| **Forward a text (SMS)** | Forward the text to a short number and get a reply | An SMS provider number (for example Twilio) and a server | Costs a small amount per message. Many older people already forward texts |

Things to think about before building a forwarding service:

- **Privacy changes.** With email, WhatsApp or SMS forwarding, messages *do* go to a server. That needs a clear privacy notice (GDPR) covering what is kept and for how long (ideally nothing, deleted straight after replying). The README must say so honestly.
- **It could be copied by scammers.** A fake "scam checker" number could become a scam itself. Publish the real number or address in one place only (this page and the leaflet), and never have the service ask for anything.
- **Same checker everywhere.** The server should run the same rules as `index.html`, so answers match. Moving the rules into their own file would let both use them.
- **Family helper.** The reply could include "Send this to someone you trust", so a family member sees it too.

## Ideas for later

- Website age and known scam-list checks, using a small server (for example on the netcup server)
- Forwarding by WhatsApp, email or text: see "Goal: passing a message on without copying and pasting" above
- A proper domain name once real people use it (needed for an email forwarding address)
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

## The api service (report a missed scam, AI second opinion)

`tools/api.py` is a small Python service with no packages except the optional Claude SDK. `deploy.sh` copies it to
`/home/deploy/sites/is-this-a-scam/api/` and restarts it. nginx sends `/api/...` to it. Add it once in Coolify,
as a second service in the same compose file as `web`, with no domain of its own:

```yaml
  api:
    image: python:3.13-alpine
    command: sh -c "pip install -q 'anthropic<2' ; python /app/api.py"
    volumes:
      - /home/deploy/sites/is-this-a-scam/api:/app:ro
      - /home/deploy/sites/is-this-a-scam/reports:/data/reports
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - AI_DAILY_LIMIT=300
    restart: unless-stopped
```

- Reports are kept in `reports/` for 30 days. They contain only the message, an optional note and the result. They hold no address and no browser details, and nothing is logged.
- The AI second opinion stays off until `ANTHROPIC_API_KEY` is set as a secret in Coolify (never in the repo or a chat). It uses Claude Haiku 5.5, up to `AI_DAILY_LIMIT` checks a day, and each address is limited to 10 an hour. Also set a monthly spend limit in the Anthropic console.
