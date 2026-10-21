# R2: Older users, scam psychology, and our journeys

Status key: [V] read on the source page this session. [S] seen only in a search summary. [K] from general knowledge, not opened this session (UNVERIFIED). Many searches returned little; gaps are stated.

## A. What the live page does now [V]
Single page. Top: text size A-/A+, "Start again". Main: paste box, 5 source options (iPhone text, Android text, WhatsApp, Email, screenshot), "Check this message" + "Clear", plus two help buttons ("Yes, help me now", "Help with a pop-up"). Result: "0 warning signs so far", a Few/Some/Many signs scale, "What they're probably after", then "What to do now". There is no explicit "no signs found" message. Lower: email headers, quiz, sharing, AI second opinion. So the first screen has about 9 choices.

## B. Design for older adults (evidence)

- W3C WAI "Older Users and Web Accessibility" [V] https://www.w3.org/WAI/older-users/ : only high-level. Names needs: text size and contrast (vision), large targets (dexterity), reduced short-term memory and distraction (navigation, finishing tasks), and high-pitched or background audio. No numbers; points to the WCAG 2.0 older-people guide. Motion is not addressed there.
- W3C COGA "Making Content Usable" [V, first 100k of 470k chars read] https://www.w3.org/TR/coga-usable/ . Patterns that matter for us: state each page's purpose; put key tasks above the fold; common words, active voice, no idioms, no double negatives; one instruction per line; use words not percentages; do not move controls unexpectedly; one-step undo/back; accept varied input formats; avoid timeouts and data loss; limit interruptions; tell users up front what a task involves (steps, time); do not rely on memory; make human help easy to reach; state the results and downsides of options; allow simplified versions and personalisation.
- NNG "Usability for Senior Citizens" (current) [V] https://www.nngroup.com/articles/usability-for-senior-citizens/ : today's older users are more confident and sceptical; problems are small text, small targets, dropdowns, light text, rigid input (hyphens or brackets rejected), obscure error messages. Advice: large text, contrast, generous targets, flexible input, clear prominent errors, do not blame users. Full report has 87 guidelines (not read). The 2013 study (earlier research file): 90% self-blame, 55% vs 75% task success, 45% reluctant to try alternate paths [V earlier].
- GOV.UK: body 19px (earlier file [V]); reading age 9 target is widely cited by councils as GOV.UK practice [S] (Surrey CC, https://www.surreycc.gov.uk/website/writing-guide/reading-levels-for-web-pages ). Plain English "mandatory" on GOV.UK [S]. "Reading age 9 is about readability, not childish tone" [S].
- NHS service manual low-digital-skills findings: search returned nothing [U]. Not verified. Age UK / Age Action / AARP digital-inclusion guidance: not opened [U].
- Frontiers review on font size (earlier file [V]): bigger helps up to a point; extra letter and line spacing helped older readers.
- WCAG 2.2: target minimum 24px (AA), 44px recommended (AAA 2.5.5) [K].
- Icons vs words: COGA says pair icons with labels [V]; never icon-only.
- Motion: COGA "let users control when content moves" [V]; prefers-reduced-motion is standard practice [K].

Concrete rules we can adopt: body 19-20px min; 48px tap targets with 12px+ gaps; no dropdowns or hover; at most 3 choices per decision screen (our 9 on the first screen is the gap) [rule-of-thumb K, not a verified number]; one question per step; label every icon; "Back" and "Start again" always visible; never time out; keep pasted text on error; plain error text that says what, why, fix; sentences under about 15 words; reading age around 9.

## C. Scam psychology

- Systematic review of older adults' online fraud victimisation (Frontiers in Psychology 2022) [S] https://pmc.ncbi.nlm.nih.gov/articles/PMC9484557 : research looks at cognitive function, trust, loneliness, personality, self-control. No consensus that cognitive decline alone explains it; technique and experience also matter, with weak data. So do not assume "confused old person" (matches FINRA profile finding in earlier file [S]).
- Emotional arousal raises susceptibility (Stanford Center on Longevity) [S, earlier file]. Mild cognitive impairment linked to higher susceptibility (Rush MAP) [S, earlier file].
- Authority, urgency, scarcity, secrecy ("don't tell the bank") as standard levers (Cialdini, Modic and Lea, Whitty "scam compliance") [K, unverified].
- Overconfidence: Take Five research cited by Age UK branches says 87% of over-65s are confident spotting fraud but only 20% had heard of all five main APP fraud types [S] https://www.ageuk.org.uk/surrey/about-us/news/articles/2023/take-five/ . Self-report, not behaviour.
- Take Five "Stop, Challenge, Protect": no randomised or controlled outcome evaluation found in 2024-25 [S]. Treat as widely endorsed advice, not proven. Scam Bingo has no outcome data [S].
- Fear vs efficacy: meta-analytic and phishing studies say coping information and self-efficacy drive protective action more than threat; fear without efficacy causes defensive reactions [S] https://www.emerald.com/ics/article/26/3/264/192321/Persuading-end-users-to-act-cautiously-online-a . An older-adult forewarning field experiment found warnings reduced acceptance of a mock scam but the effect faded over time and did not transfer to a different scam [S] (doi 10.1023/a:1005822414588, not opened; verify before quoting).
- Prebunking: video prebunking (n about 19,700, aged 45+ included) gave small effects (d 0.08-0.38); longer 50s videos more consistent than 20s [S] https://link.springer.com/article/10.1038/s44271-025-00379-3 . Misinformation, not scams. No scam-specific older-adult RCT found [S].
- Mailed warning RCT (USPIS) cut re-victimisation 8.6% (letter) and 22.4% (letter plus 5 leaflets) [V earlier file].
- Trusted contacts: FINRA Rules 4512/2165 (2018) let firms ask for a trusted contact and hold payments 15 days (+10) [S]. Outcome evidence not found [U].
- Confirmation of payee, friction on payments: no evidence retrieved [U].
- Shame: National Trading Standards Scams Team 2025 toolkit and language guide, "No Blame, No Shame": blame is aimed at criminals; blame stops reporting [S] https://www.nnetwork.org.uk/online-safety/the-national-trading-standards-scams-team-training-providing-support-to-fraud-and-scam-victims/ . Victim Support: remind self-blaming victims they are not to blame [S]. AARP March 2025: avoid "How could you fall for that?", describe the scammer's actions instead [S] https://www.aarp.org/states/new-hampshire/shifting-the-conversation-about-scams-no-more-victim-blaming/ . Preferred terms: "criminals" over "scammers" [S].

## D. Our journeys

1. "Very likely a scam". Evidence supports: lead with one clear verdict in words (not only a meter), then one primary action ("Do not click. Delete it." / "Ring your bank on the number on your card"), with efficacy framing ("You can handle this in 2 steps") and no alarmist styling. Say why in 1-3 plain bullets. Keep the "what they want" line. Offer "Tell someone" as secondary. [inference from fear/efficacy literature, COGA]
2. "No obvious signs". Currently there is no explicit state. Risk: false reassurance. Use a neutral, non-green verdict: "We found no warning signs. That does not prove it is safe." Then the safe-check action: "If it asks for money, a code or a login, check by ringing the company on a number you already have." Avoid ticks or green shields. [inference; the README already refuses to say "safe"]
3. Already on a call. Garda advice [S]: hang up, ring the real organisation yourself, never use the number given, and check for a dial tone first because the criminal may not have disconnected (2015 Garda warning) https://www.garda.ie/en/about-us/our-departments/office-of-corporate-communications/press-releases/2015/september/further-warning-regarding-a-telephone-scam-known-as-vishing-on-the-25-9-15.html . Our flow already says wait five minutes or use another phone [V]; add the dial-tone step. Make it one big instruction per screen, stay minimal, and add a phrase to say: "I'll call you back on the number I have." Include "Pause: the person is trying to rush you" as normalising text. Hanging-up effectiveness has no study [S].
4. Family involvement with autonomy. Save helper on-device already exists [V]. Keep it opt-in, let the user choose what is shared (default: just the message and the verdict), phrase the share text as the user's own ("Can you take a look at this?"), and avoid anything that notifies family automatically. Trusted-contact outcome evidence is missing [U]; the principle (user controls the contact) is consistent with FINRA's voluntary 4512 model [S].
5. Already paid. Order: reassure (criminals are skilled; it is not your fault), ring the bank at once on the number on the card, tell the Gardai, change passwords, watch for "recovery" scams. Gardai: contact bank and local Garda station [S]. Use No Blame No Shame wording [S]. Show the one most urgent action first and a big "Ring my bank" prompt. Add "Talk to someone" (Age Action, Samaritans) [K for numbers: verify before use].
6. Voice/read-aloud: no scam-specific study [U earlier]. WAI warns about high-pitched voices and background audio [V]. Use browser speech with slower rate, a pause/stop button, voice choice, and no auto-play.
7. Low vision, tremor, hearing loss, early dementia: low vision = scalable text, contrast, reflow (WCAG) [K]; tremor = big targets, no drag, no double-tap, confirm only destructive actions [K, COGA "avoid mistakes" V]; hearing loss = all content as text, captions on any audio; early dementia = one task per screen, no memory load, remind of what to do next, keep progress saved, tell the person what step they are on (COGA [V]). Support for dementia specifically was not retrieved [U].

## E. Ranked changes (15-25)

| # | Change | Why / evidence | Effort | Where |
|---|---|---|---|---|
| 1 | Add an explicit "no obvious signs" result that is neutral and says what to do next ("ring them on a number you know") | Gap on live page [V]; false reassurance risk; efficacy framing | Low | Browser |
| 2 | Result starts with a one-sentence plain-words verdict plus ONE main action; scale demoted | COGA clear content, one instruction per line [V]; efficacy beats fear [S] | Low | Browser |
| 3 | Cut first-screen choices: show paste box + two help buttons; move source choices and email headers into "How do I copy?" | COGA focus, limit distractions [V]; 9 choices now [V] | Med | Browser |
| 4 | Help-now: one instruction per screen, big Back, add "wait for a dial tone" | Garda 2015 warning [S]; COGA memory/step [V] | Low | Browser |
| 5 | Paid-already path: "Not your fault" opener, then bank first, then Gardai | NTS No Blame No Shame [S], Victim Support [S], Garda [S] | Low | Browser |
| 6 | Rewrite all warning copy: blame the criminals, never "you fell for" or "careless"; quiz wrong answers "this one is hard to spot" | NNG self-blame [V], AARP [S] | Low | Browser |
| 7 | Min body 19-20px, 48px targets, 12px gaps; check A+ goes to at least 150% without horizontal scroll | GOV.UK 19px [V], NNG [V], WCAG [K] | Low | Browser |
| 8 | Reading-age 9 pass on all copy; short sentences; no idioms; words not percentages | GOV.UK practice [S], COGA [V] | Med | Browser |
| 9 | Replace Few/Some/Many bar with words+icon labels; never icon-only; avoid red-only | COGA icons+labels [V] | Low | Browser |
| 10 | Persist text size, calm mode and read-aloud choice; offer "Make everything bigger" on first load | COGA personalisation [V] | Low | Browser |
| 11 | Read-aloud: slower default rate, pause/stop, no auto-play, text always available | WAI audio caution [V] | Low | Browser |
| 12 | Keep pasted text and answers when user goes back, errors or reloads; "Start again" asks to confirm | COGA avoid data loss, undo [V] | Low | Browser |
| 13 | Tell users upfront what a task needs ("2 minutes, 8 messages") in quiz and header check | COGA focus [V] | Low | Browser |
| 14 | Share-to-helper: user picks what to send, wording in user's voice, preview before sending; no auto-notify | Autonomy; COGA control [V]; FINRA voluntary model [S] | Med | Browser |
| 15 | "Pause" nudge when result is scam and user starts sharing money-related steps: "Wait 5 minutes before doing anything else" | Pause/implementation intentions [K, unverified] | Low | Browser |
| 16 | "If-then" plan card: "If someone rushes me, I will say I'll ring back on the number I have" (printable) | Implementation intentions [K]; USPIS leaflets [V earlier] | Med | Browser |
| 17 | Quiz: booster reminder at one week with 3 messages (already there); add a mid-quiz "tap the clue" mode and efficacy feedback | BC CRR decay [V earlier]; foreward warning decays and does not transfer [S] | Med | Browser |
| 18 | Quiz and results show a "why" in one sentence and name the pressure lever (authority, urgency, secrecy) | Inoculation style; generalises tactics rather than single scams [S/K] | Med | Browser |
| 19 | Reduced-motion and no auto-moving elements; no timeouts | COGA [V], WCAG [K] | Low | Browser |
| 20 | Keyboard/tremor aids: no drag, no double-tap; confirm only before destructive actions; spacing between Check and Clear (Clear is destructive) | COGA avoid mistakes [V] | Low | Browser |
| 21 | Printable one-page "5 signs + what to do" card for libraries and Age Action groups | USPIS mailed leaflets [V earlier] | Med | Browser (static) |
| 22 | Trust signals: show who built it, that nothing is sent anywhere, and links to Garda, FraudSMART, CCPC at the top of results | Trust and privacy statements are mostly [K]; privacy fact is from README [V] | Low | Browser |
| 23 | Add support line for emotional help after payment (verify numbers: Age Action, Samaritans, Victim Support Ireland) | Victim Support [S]; numbers [U] | Low | Browser |
| 24 | Optional anonymous counters of quiz accuracy to evaluate learning | Evaluation gap [V earlier] | Med | Server (only if privacy policy allows; otherwise skip) |
| 25 | Usability test with 5-8 older Irish users, incl. one with low vision and one with tremor | None of this was tested with users; NNG and COGA both say test [V] | High | Process |

## F. Gaps / unverified
- Age UK, Age Action, AARP digital guidance, NHS and GOV.UK specific findings on low-confidence users: not opened.
- Take Five effectiveness: no evaluation found.
- Trusted contact, confirmation of payee and payment friction outcome data: not found.
- Fear vs efficacy for scam warnings in older adults: only general and phishing studies found.
- The 87-guideline NNG report and the 2026 UCLA study: not read.
- Numbers like 48px and "3 choices per screen" are our rules of thumb, not study results.
