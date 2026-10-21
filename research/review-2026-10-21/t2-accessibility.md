# Accessibility audit: isthisascam.selfdestruct.online (T2)

Method: puppeteer + axe-core 4.10.2 (wcag2a/aa, 21a/aa, 22aa, best-practice) at 390 and 1280 wide, across input (closed and all details open), scan, result (bank, real, hidden, parcel), send panel, helper form, report box, AI/second opinion section, call, pop-up, quiz question, quiz feedback, quiz end. Plus keyboard tabbing, accessibility tree, 320px, 195px (200% of 390), A+ x3, forced-colors, reduced-motion. Screenshots and raw data: C:\Users\olear\AppData\Local\Temp\claude\c--Scripts-ScamChecker\e1292e2c-39b9-4a1f-b94f-b4bc31995bab\scratchpad\a11y\ (out.json, out2.json, *.png). Note: the AI "Ask Claude" button is hidden outside Claude; the live site shows only the copy-question-for-ChatGPT/Copilot flow, so that is what was tested. The leaflet page was not audited (time).

## Issues (ranked)

### 1. Quiz feedback: focus jumps to "Next question", verdict never announced (MEDIUM-HIGH)
- View: quiz, after answering. Element: `#quizNext` (focused in `answerQ`), `.quiz-feedback` (no role, no live region; `#quizView` and `#quizBody` have no aria-live).
- WCAG 4.1.3 Status Messages, 1.3.1. A screen-reader user hears only "Next question, button". They never hear "Well spotted / This one is genuine", the lesson, or the signs unless they browse backwards. Marked-up message is also re-written in place.
- Fix: focus the feedback `<h3 tabindex="-1">` (or give `.quiz-feedback` role="status") and let Tab reach Next; or move focus to the h3.
- Screenshot: quiz-fb-390.png

### 2. User's browser/OS default font size is ignored (MEDIUM-HIGH for the target group)
- Everywhere. `html { font-size: var(--fs) }` where `--fs` is set in px (14/16/17/19/22/25) by `A-`/`A+`.
- WCAG 1.4.4 passes via zoom, but anyone who has set larger text in OS/browser (very common for the target audience) gets 16px anyway and must find A+ (3 presses to reach 22px). Not tested with a real 24px default (CDP cannot set it), found from the source.
- Fix: default `--fs` to `100%` (or `1rem`), apply A+/A- as a percentage multiplier; consider remembering the choice (it does persist via localStorage `itas-size3`).

### 3. Severity of highlights carried by colour alone; numbered tags are meaningless read aloud (MEDIUM)
- View: result and scan message box `mark.flag.on.high/medium/low` + `sup.tag`; quiz `#quizMsg`.
- WCAG 1.4.1 Use of Colour, 1.3.1. High/medium/low differ only by background and underline colour (red/amber/blue-ish). Under forced-colors all marks become the same system yellow (forced-390-result.png), so severity is lost (the number list remains and groups are labelled "Strong warnings / Warnings / Small signs", which helps). Screen reader reads "alerts@northfie1d-bank-verify.com 1 URGENT 5 suspended 6" with nothing saying the numbers refer to the list below. In the quiz the `sup.tag` elements are empty, so there is no number at all; the highlights are colour only, and the "signs" list below is not linked to them.
- Fix: add visually hidden text inside each mark ("warning sign 1, strong:") or `aria-label` on the sup ("see sign 1"); add a non-colour cue per level (underline style: solid/dashed/dotted, or a text label); add `forced-color-adjust`-safe border/underline.
- Screenshot: result-bank-390.png, forced-390-result.png

### 4. Whole result panel is `aria-live="polite"` (MEDIUM)
- `#resultView aria-live="polite"` (also `#foundCount` polite). The panel is unhidden and focus is moved to `#verdictTitle`, so the live region and focus compete; any later change inside the panel (todo list, send panel toggling, passMsg status, copy messages) can be re-announced, and a large block can be read when it appears. `#foundCount` announces "N warning signs so far" on every change during the scan (up to 10+ interruptions), including "1 warning signs" style grammar (check).
- Fix: remove aria-live from the panel (focus on the h2 already announces the verdict); keep one polite status for the scan that announces only "Check complete, N signs". Announce scan stages sparingly.

### 5. Small tap targets (MEDIUM)
- Footer `a[href="leaflet.html"]` 83x17; source links `.src a` (Garda, CCPC, gov.ie) 17-20 px tall, 36-38 px wide; "Find your local station" 169x20; `#incMsg` checkbox 21x21 (label text is clickable, but the box is tiny); `.size` buttons and `.linkish` are 44px (ok) but the inline text links and the `tel:` links in the report box are text height only. WCAG 2.5.8 (24px AA) fails for the 17-20px links in some cases by spacing; 2.5.5 (44px) not met. For a user with a tremor these are hard.
- Fix: padding or `min-height:44px; display:inline-flex` on links; enlarge the checkbox to 28px with a large label.

### 6. Contrast fail in the scan view, chip text (LOW-MEDIUM)
- `.low.chip` (12px bold) 4.09:1 (#62786a on #040f09) at 1280 in the dark scan theme. WCAG 1.4.3. Also very small text: chips 12px, eyebrow 12.8px, `.src`, "Text size" label 13.6px.
- Fix: lighten the muted colour to 4.5:1+ and use at least 14-16px.
- Screenshot: scan-1280.png

### 7. Horizontal scroll below 320 CSS px (LOW)
- At 195px (200% on a 390 phone) the header `.top` / `.size` row ("Start again" button) overflows to 213px; the page scrolls sideways on all views. 320px, 400% zoom of 1280 (=320) and A+ x3 at 320 are all fine. Fails only beyond 1.4.10's 320px requirement.
- Fix: `flex-wrap: wrap` on `.size`.

### 8. No Escape / no skip link / focus order oddities (LOW-MEDIUM)
- Escape does nothing in the send panel, helper form, scan, quiz or call/pop views (no traps either). Nice-to-have: Escape closes `#sendPanel` and `#helperForm` and returns focus to the toggle.
- Input view: first three Tab stops are A-, A+, Start again, before the real task; no skip link. After "Check another message" focus goes to `#msg` (good).
- Result view: `#scanBox` (tabindex 0, region "The message being checked", the marked message) comes after the send toggle in tab order, so keyboard users reach the highlighted message last. `#promptOut` pre (tabindex 0) is in the order too. Fine, but add the message earlier or a link "see the marked message".
- Back from call/pop correctly returns focus to `#callStart`/`#popStart`; quiz back goes to `#msg`.

### 9. Landmarks and headings (LOW)
- Heading outline per view is sane: input has only H1 (no H2 for "paste", "someone on the phone", "examples"); result H1, H2 "This is very likely a scam", H3 "What to do now", H2 "What we found", H2 "Get a second opinion from an AI"; call/pop: H2 title, H3 sections; quiz H2 plus H3 in feedback. The `.panel` sections have no accessible name so they are not landmarks. `<main>`, header and footer exist.
- Fix: add short visible or hidden H2s to the input view; `aria-labelledby` on panels is optional.

### 10. Meter is `aria-hidden` (LOW)
- `.meter` hidden from SR; the verdict title/sub carry the meaning so acceptable. In forced-colors the meter fill disappears (empty bar with "Few/Some/Many signs") and is meaningless for those users. Fix: give the fill a border/`forced-color-adjust: none` or `background: Highlight`.

## Older-user lens (wording, choices, tone)
- **Too many choices on the input screen**: ~20 controls (text size x3, paste, screenshot, 3 disclosures, check, clear, call, pop-up, install, practise, 7 example buttons, leaflet, Matrix toggle). Suggest the example buttons and install help sit behind one disclosure; keep "Check this message" prominent.
- **"Start again" at the top vs "Check another message" at the bottom of result** do the same thing under different names. Pick one wording.
- **"Matrix effect for demonstrations: off"** in the footer is meaningless and slightly alarming for this audience (it also uses a toggle written as a link). Hide it by default (reuse a hidden/secret toggle, per the "show only what is used" preference).
- **Jargon**: "headers" / "hidden details", "disguised link", "padlock (https)", "cryptocurrency", "remote-control software", "Gardaí" (fine for Irish users), "screenshot", "PIN". The padlock explanation is good but the card text for a Risky link is long (3 sub-reasons).
- **Result page is long** (about 4,700px at 390 wide before the AI box): verdict, what to do, report, buttons, 10 cards, the marked message, then the AI prompt and a long prompt text. The most important text (verdict, "what to do now") is at the top: good. The "what we found" list could be collapsed by default for non-scam results.
- **Frightening/overwhelming**: on a "very likely a scam" verdict, the page applies a red alarm frame, rain animation banner and dark theme. Strong, but the message is calm ("Do not click... ") and the call/pop pages add "It's not your fault. These people are very good at what they do." (good, non-shaming). Quiz wrong answers: "Good to be careful" / "This one is hard to spot" (kind, good). Suggest a calmer, less intense frame when reduced motion is on (see below).
- **Next step**: result has three primary controls (Check another / Read aloud / Send result) of the same weight and nothing says "Call your bank if you already clicked" as a button; the instruction is in the last bullet of the list and in a closed disclosure. Suggest putting "Already clicked or paid?" as a visible, bold line.
- **Reading level (Flesch-Kincaid estimate)**: verdict sentences and "What to do now" about grade 5-7; call and pop-up pages about grade 5-6; report disclosure about grade 7-8; the AI prompt text and "Matrix effect" about 9-10 (not user-facing). Good overall.
- **Hand tremor**: main buttons are 54-58px tall (fine). Small links as above are the risk; `A-`/`A+` are 44px but side by side with "Start again".

## Zoom, large text, motion, colour
- 320px: no horizontal scroll or clipping in input, scan, result, send, quiz. 400% (320px effective): clean. A+ x3 (22px) at 390 and 320: clean, no overlap. 200% at 390 phone (195px): header overflow only (#7).
- Reduced motion (`prefers-reduced-motion: reduce`): `*{animation:none;transition:none}` is applied; the Matrix toggle is hidden; verdict clear, scan jumps. The rain canvas (`#rain`, `#vrain`) is JS-driven: confirm it is not started when `reduce` (code checks `reduce` at line 599; looked fine in reduced-390 screenshots but not verified frame by frame).
- Forced colours: verdict heading, icon (with its shape), text and buttons all readable; the red/amber alarm frame and the meter fill disappear; highlights become uniform (see #3, #10). The verdict is still clear from text.
- Meaning by colour only: highlight severity (#3), meter (aria-hidden, labelled scale only). The verdict itself is carried by text + icon shape (triangle / circle) + title, which is good.

## What passed
- axe-core: zero violations in every view and state at both widths, except one colour-contrast hit (#6) on the scan view at 1280.
- Every input has a label (`#msg`, `#hdr`, helper name and number, "Include the message itself"); icon buttons named ("Smaller text", "Bigger text"); `aria-pressed` on toggle groups; `aria-expanded`/`aria-controls` on the send toggle; error fields use role="alert"; status messages use role="status".
- Focus is moved sensibly on view change: scan to `#scanStatusWrap`, result to `#verdictTitle`, call/pop/quiz to their titles, back to the launching control; no keyboard traps; every control is reachable and shows a visible 3px outline (no `[NO-OUTLINE]` found in the tab runs).
- Tap targets for primary buttons 48-58px; `.small-btn`/`.linkish`/`summary` 44px minimum.
- No text clipping, no overlap at 320px, 400% zoom or A+ x3.
- Tone: plain language, reassuring ("It's not rude", "It's not your fault"), advice consistent across views.
