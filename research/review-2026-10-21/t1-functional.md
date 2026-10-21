# Functional test report: https://isthisascam.selfdestruct.online/

Tested: Chrome (puppeteer) at 390x844 and 1280x800, WebKit and Firefox (Playwright 1.48.2) at both sizes, offline/service worker, print, headers, static JS review. Scripts and screenshots in the pw scratchpad folder (chrome1.js/chrome1.out, offline.js, cross.js, print.js; c-*.png, x-*.png, off-*.png, print-*.pdf).

## Bugs

### 1. HIGH (critical for old iPhones): regex lookbehind kills the whole script on Safari < 16.4
- Where: index.html line 716, inside the RULES object: `(?<!(library|loyalty|clubcard|membership|leap|travel) )card (number|details)` in a regex literal.
- Lookbehind (and especially a variable-length one) is a SyntaxError on Safari/iOS before 16.4 (iOS 14, 15, 16.0-16.3). A regex literal is parsed with the script, so the entire inline script fails to parse: no buttons work, nothing happens at all.
- Expected: page works on iOS 14+. Actual (by inspection; not reproducible on current engines): dead page on those devices. Not executed on a real old Safari; WebKit 18 build used here is modern.
- Fix idea: rewrite without lookbehind (match optional prefix word and discard hit if prefix is one of the exceptions).
- Browser: Safari/iOS < 16.4.
- Other syntax checked, none found in the JS: class fields/static blocks, top-level await, `.at()`, structuredClone, replaceAll, `?.`/`??` (ok anyway), named groups, `\p{}`, `s` flag. JS is ES5-style apart from the lookbehind.
- CSS notes (low): flex `gap` (`.row`, `.top`, `.size`, etc.) needs iOS 14.5, so on 14.0-14.4 the buttons lose spacing; `inset:` (lines 76, 228) needs 14.1 (the rain canvas / alarm frame would not size); `:focus-visible` rule at line 126 is a grouped selector, so on iOS < 15.4 the whole rule is dropped (no keyboard focus ring).

### 2. MEDIUM: shared-message URL goes to the server when no service worker controls the page
- Steps: fresh browser profile (no SW yet), open `/?text=Your%20parcel%20is%20held%20pay%202.99%20at%20http%3A%2F%2Fanpost-fee.top`.
- Expected: that URL never requested from the network. Actual: the first load requests the full URL from nginx (visible in request log), so the message text appears in server access logs. With the SW installed and controlling, it is answered by the SW from cache (response fromServiceWorker=true) and does not hit the network, online or offline. Same exposure whenever the SW is not active (first visit, SW evicted by iOS after weeks of non-use, private mode, SW blocked). Android share target on a never-opened/uninstalled-SW install is the main case.
- Mitigation idea: nginx `access_log off` / strip `$args` for `/`, or a log_format without the query string; or note it as accepted.
- Browser: all. Message was checked and the address cleaned to `/` correctly in every case.

### 3. LOW: live service worker version differs from source
- Live caches show `itas-v18`; C:\Scripts\ScamChecker\is-this-a-scam\sw.js says `itas-v17`. Source in the repo is out of sync with what is deployed (or the reverse).

### 4. LOW: leaflet.html is not in the SW precache list
- FILES in sw.js omits `leaflet.html`, so the leaflet is not guaranteed offline (it opened offline in my run because it was served via the network-first path / cache; not guaranteed on a fresh install). Also leaflet.html has no Cache-Control header (index.html and sw.js have no-cache) so edits may be served stale from heuristic caching.

### 5. LOW / design note: "Check another message" keeps the old message
- Steps: example "Bank email" > result > "Check another message". Input view returns with the previous message (and hidden-details header text) still in the boxes. Only "Start again" clears them. May be intended; flagging because the brief lists states that should reset. Everything else reset correctly (see passed list).

### 6. INFO: 1-2 word input is accepted
- "hi" goes through a full scan and returns "No obvious warning signs found". Reasonable but a very short input could warn "that looks too short".

No console errors, page errors or failed/4xx requests in any browser/viewport (Chrome mobile and desktop, WebKit, Firefox).

## Passed
- Views and controls, Chrome 390 and 1280: no horizontal overflow; A-/A+ (14px to 25px range, persisted across reload); empty-input error; clear; all 7 examples (scan > skip > result, verdict/meter/todo correct, "Genuine notice" gives 5%, "hidden details" example opens header box and fills it); natural scan finishes in about 5s; skip works; Start again mid-scan cancels the scan (no stray result 4s later).
- Result: report box, read aloud toggle (Read/Stop), send panel toggle with aria-expanded, include-message checkbox, mailto built on click (subject, body), copy (clipboard verified, links defanged), save file, WhatsApp (`wa.me/353...`, target _blank noopener) and SMS links correct, helper validation (empty name, bad number), save, persist after reload, remove, call/pop "Ring my helper" `tel:` link when helper saved.
- AI second opinion view: "Ask Claude" hidden on the website (only copy-the-question path shown), ChatGPT/Copilot/Claude tabs switch link and label, copy question works.
- Paste button (clipboard), screenshot OCR (generated image read correctly), copy-help tabs (5) and header tabs (4), call view and virus pop-up views and Back.
- Quiz: 8 questions, feedback right/wrong, answer buttons removed after answering, Next, finish screen and score, itas-last/itas-seen stored, Play again fresh Q1, Start again from quiz then re-enter gives fresh Q1 with no stale feedback, "Check a real message" returns to input and focuses it, refresher line appears at 10 and 70 days (text "a week", "a while"), hidden at 6 days, refresher is 3 questions.
- Matrix toggle on/off, persisted across reload.
- Offline: SW installs (cache with index, icons, fonts, manifest), reload offline works with fonts, example check works offline, quiz works offline, leaflet opens offline; `?text=` offline is answered by the SW, message checked and URL cleaned to `/`; online with SW also never reaches the network (fromServiceWorker=true).
- WebKit and Firefox at both sizes: example > scan > result, save, quiz question with feedback, call and pop views, Matrix toggle, `?text=` share, leaflet, SW registration all fine; no console errors, no overflow.
- Headers on `/`, `/index.html`, `/leaflet.html`, 404 pages: CSP, Referrer-Policy no-referrer, nosniff, Permissions-Policy present. `/sw.js`, manifest and fonts have nosniff (and correct cache-control; CSP not needed there). 404 for /tests/, /research/, /PROJECT-NOTES.md, /.git/config, /Dockerfile, /nginx.conf, /deploy.sh, /README.md, /forwarding/.
- Print (print media + pdf): result prints as a clean 2-page A4 text summary, only the print area visible; links shown as `hxxp://...[.]` with "[link switched off: reason]", emails as `[at]`/`[.]`, domains defanged; the only live URL is the site address in the footer line. Leaflet prints on 1 A4 page.
