# R4: Training and design research for "Is This a Scam?"

Status key: [V] verified from the page itself. [S] only from a search snippet or secondary source. [U] unverified or could not be checked.

## Training that works (evidence)

1. **Mailed warnings to known older victims cut re-victimisation (strongest trial evidence).** US Postal Inspection Service RCT, abstract (Innovation in Aging, 2024 supplement). One warning letter reduced re-victimisation by 8.6% over 4 months vs control. Letter plus five "Fraud Fighter" leaflets two weeks apart reduced it by 22.4%. Sample size and p-values not reported. Behavioural outcome (returned addresses on detained scam mail), not self-report. [V] https://pmc.ncbi.nlm.nih.gov/articles/PMC11689558 . Caveat: targets people already victimised, not the general public.

2. **Interactive scam-spotting training beats written tips, but decays.** Boston College Center for Retirement Research summary. Trainees reviewed real and fake emails and websites, then saw explanations. They were "much more likely to spot a scam" than tips or unrelated-info groups, opened fewer suspicious links, and did not become overly distrustful of genuine messages. The benefit faded after two weeks, which suggests booster sessions. No percentages or sample size given. [V] https://crr.bc.edu/yes-you-can-be-trained-to-detect-imposter-scams/

3. **Email scam training, older vs younger adults (UCLA, 2026).** Alberts, Espiritu and Castel, *Experimental Aging Research* 52(4), 2026, DOI 10.1080/0361073X.2026.2635903. Three conditions: control, read-only, interactive. Results could not be retrieved (PDF fetch failed on certificate error). [S] https://castel.psych.ucla.edu/wp-content/uploads/sites/111/2026/03/Spot-the-Scam-Identifying-Email-Scams-and-Scam-Susceptibility-in-Younger-and-Older-Adults.pdf . Worth reading for the interactive-vs-read-only result, which is the question this app depends on. [U] outcome.

4. **Small Italian socio-cognitive training (n about 60, "Pensiamoci bene").** No significant change in belief about susceptibility. Participants did feel less gullible than both controls. Randomisation not confirmed. [S] Thesis: https://unitesi.unipv.it/handle/20.500.14239/26452 . Treat as weak.

5. **Gamified inoculation / prebunking (Bad News; Jigsaw).** Bad News with about 15,000 self-selected players: about 21% better at judging fake headlines after play, no change on real news, larger gains for the most susceptible. Pre-post design, no control group. Basol et al. 2020 replication addressed the control gap. [S, press figures] https://www.sciencealert.com/a-simple-online-game-works-like-a-vaccine-against-fake-news ; [S] https://misinforeview.hks.harvard.edu/article/gamified-inoculation-reduces-susceptibility-to-misinformation-from-political-ingroups . Jigsaw/YouTube prebunking study (about 30,000 people): about 5 percentage points better on the answer. [S] https://news.yahoo.com/google-hopes-inoculate-internet-users-184500761.html . Misinformation, not scams, and not older-adult specific.

6. **Google/Jigsaw Phishing Quiz.** Eight messages, some real phishing, some legitimate, based on training of about 10,000 high-risk users. No published effectiveness evaluation found. [S] https://www.tomsguide.com/uk/us/google-phishing-quiz,news-29198.html . Treat as a format to copy, not evidence of benefit.

7. **Scam Defender Obstacle Course (NortonLifeLock, CHI 2020 demo).** Tests then teaches. Workshop with 17 seniors. Some struggled with the tool, so it needs tailoring for older users. [S] Cited via the UCLA search results; check the source before quoting.

8. **Risk factors that shape training design.** Emotional arousal (excited or angry states) raised older adults' purchase intent for falsely advertised products (Stanford Center on Longevity). Mild cognitive impairment was linked to greater scam susceptibility (Rush MAP, adjusted models). [S] https://longevity.stanford.edu/emotional-arousal-may-increase-susceptibility-to-fraud-in-older-adults ; https://longevity.stanford.edu/category/victim-profiling . Implication: the app's "slow down, check" advice matters more than spotting tricks.

9. **Victim profile is not "the confused elderly".** FINRA Foundation (2006) found victims tended to be married, college-educated, male, with above-average income and financial literacy. [S] Search summary only. FINRA July 2026 report: many people do not think of a fraud type unprompted, which leaves them open to it. [S] https://www.finra.org/media-center/newsreleases/2026/finra-foundation-research-reveals-gaps-fraud-awareness-may-leave

10. **Consistent "rules of thumb" from authorities.** FTC principles for helping older adults spot fraud: slow down, check with a trusted person, never pay by gift card, wire or crypto when contacted unexpectedly. [S] Cited via search. The PDF could not be read (binary): https://consumer.ftc.gov/system/files/consumer_ftc_gov/pdf/Guiding%20Principles%20to%20Help%20Older%20Adults%20Spot%20Fraud.pdf . Check the PDF before quoting wording.

**Bottom line on evidence.** Trial evidence is thin and mostly US. The most reliable effects are: interactive practice with feedback beats passive tips, the effect fades within weeks without refreshers, and mailed/repeated reminders reduce re-victimisation. There is no published evidence yet for a free web quiz improving real-world outcomes. We should measure it ourselves (see Ideas).

## Quiz ideas

Quiz formats seen in the field (all [S] unless noted):
- **Binary scam/genuine with explanation after each answer.** Used by Westpac and Jigsaw. Simple, low effort.
- **Real screenshots or mock messages, judged in context.** Jigsaw (eight messages), UCLA (interactive). Matches our "paste a message" flow.
- **Tap the clues.** Show the message, let the user tap the sign (sender address, link, urgency, payment request), then explain. Not confirmed in any source above; this is a design idea, [U] for effect.
- **Timed or streak rounds.** Common in Bitdefender Scam Masters. Risk: pressure is itself a scam tactic and may cause anxiety. Use only as an option.
- **Generational "who spots it better" framing.** ACCC (Australia) ran a challenge between generations. Good for shareability, not tested for learning. [S] https://www.accc.gov.au/node/84427
- **Short topic quizzes (10 scams, about 3 to 5 minutes).** Service Victoria. [S] https://service.vic.gov.au/spotascam

Feedback style (from the evidence): explain why, not just right or wrong (interactive training in the BC CRR summary gave clues after each answer). Tell people what to do next, not only what was wrong. Avoid shaming: the NNG 2013 study found seniors blamed themselves for problems 90% of the time, so wrong answers should read as "this one is hard to spot", not "you fell for it". [V] https://www.nngroup.com/articles/usability-seniors-improvements/

Spacing: the 2-week decay means a practice round should be offered again (booster), e.g. a "one-message refresher" after a set time, or a "come back next week" note. [S] from the BC CRR summary; interval is not optimised.

## Design rules for older users

Sourced rules:
- **Default body text at least 19px (GOV.UK).** GOV.UK default paragraph size is 19px; `govuk-body-s` (16px) is for sparing use. [V] https://design-system.service.gov.uk/styles/paragraphs
- **Minimum 12pt (16px) for seniors' default text.** NNG 2013. [V] https://www.nngroup.com/articles/usability-seniors-improvements/ . The British Dyslexia Association also advises no smaller than 12pt. [S] via https://www.government-transformation.com/en/citizen-experience/gov.uk-typography-scale-to-be-made-more-accessible
- **Bigger is not always better.** Older adults prefer larger type, but readability falls below a critical size (about 0.15 to 0.3 degrees visual angle). Tablet studies gave 14pt to 22pt. Results vary by study and language. [V] https://www.frontiersin.org/articles/10.3389/fpsyg.2022.931646/full . Our answer: body text at 18 to 20px, with a user-adjustable larger size.
- **Spacing helps.** Extra inter-character and inter-line spacing improved older readers' performance (Wang 2009; Hou 2020 preferred 0.5 to 1.0pt extra). [V via the Frontiers review above; the Frontiers page itself is the source]. Typeface: no consistent winner; the UK sample preferred sans serif. [V] same source.
- **Large links and buttons, with white space between them.** Reduces wrong clicks. [V] NNG 2013 link above. Specific size not given in NNG; WAI also says large targets. [V] https://www.w3.org/WAI/older-users/ . Use 44px+ tap targets as our own rule [U for older-user specific numbers; WCAG 2.2 AA minimum is 24px, see Ideas].
- **Let users enlarge text.** NNG and WAI both say so. [V] both links above.
- **No hover menus, no pull-downs, no moving elements.** Seniors need static, precise-free controls. [V] NNG 2013 link.
- **Keep steps stable; avoid redesign.** About half of seniors keep written step lists. [V] NNG 2013.
- **Plain, specific error messages: say what, why, how to fix.** Keep them prominent. [V] NNG 2013.
- **Tolerate input formats.** Accept hyphens, spaces, brackets in phone numbers. [V] NNG 2013.
- **Visited vs unvisited link colours differ clearly.** [V] NNG 2013.
- **Contrast and plain language.** WAI: good colour contrast; understandable content because reduced working memory affects following multi-step content. [V] https://www.w3.org/WAI/older-users/ . No numeric thresholds given there.
- **Audio caution.** WAI: older users may struggle with high-pitched sound and audio over background music. [V] same.
- **Read-aloud.** No verified study found on read-aloud for scam messages. [U] Keep it optional.
- **Reading level.** No GOV.UK or NNG reading-age figure found in search. [U] Use plain English: short sentences, common words, one action per step. Check GOV.UK content design guidance directly before quoting a level.

Things that confuse older users online (NNG 2013, [V]): slower performance (43% slower than 21 to 55 controls, success 55.3% vs 74.5%, 2.4 vs 1.1 errors); 45% reluctant to try alternate paths; they give up about twice as often as younger users.

Note: NNG 2013 is old and based on 75 users. The NNG "Usability for Older Adults: Challenges and Changes" URL returned 404. [U] Find the current NNG article before citing newer figures.

## Ideas for us

| Idea | Source | Why | Effort |
|---|---|---|---|
| Body text 18 to 20px, with a visible "larger text" toggle that persists | GOV.UK 19px; NNG 12pt; Frontiers review | Matches the evidence on size; users can adjust | low |
| Tap targets 44px+ and white space between buttons | NNG 2013; WAI | Fewer wrong clicks | low |
| Static menus only; no hover or pull-down menus | NNG 2013 | Seniors struggle with precise pointing | low |
| Explanation after every quiz answer, with "what to do next" | BC CRR interactive training; NNG error wording | Feedback teaches, shame does not | low |
| Non-shaming wording for wrong answers ("this one is hard to spot") | NNG 2013 (self-blame 90%) | Keeps people coming back | low |
| "Tap the clue" mode: user taps the sender, link, urgency, payment request | Jigsaw/UCLA interactive idea; [U] effect | Trains the signs, not just the verdict | med |
| Booster reminder: "Try 3 messages again next week" (local storage or email opt-in only if asked) | BC CRR decay finding (2 weeks) | Retention fades without refreshers | med |
| Mix in genuine messages (about 50%) and say so | BC CRR (no over-distrust); Jigsaw (legitimate items) | Stops people calling everything a scam | low |
| Measure it: pre and post 8-message test, record accuracy by round (no personal data) | Gap found: no evaluation of free quizzes | We can show whether it works for our users | med |
| Mailed or printed one-page card version of the "5 signs" for libraries and Age Action groups | USPIS mailed RCT (8.6% and 22.4% reductions) | Best trial evidence is low-tech reminders | med |
| "Slow down, check with a trusted person, never pay by gift card, cash, crypto" as the headline rule | FTC principles (summary, [S]) | Simple, memorable, matches risk factors | low |
| Emotion-aware copy: "If this makes you feel rushed or scared, stop and ring someone you trust" | Stanford arousal study [S] | Targets the arousal pathway | low |
| Optional read-aloud button on results (browser speech API) | WAI audio caution; no verified study [U] | Helps low-vision users; test before claiming | med |
| Ireland-specific scam examples (Revenue, bank, An Post, HSE, Eir) in the quiz | Gap: no Irish evidence found; Age Action Ireland and ScamwiseNI material is old | Local recognition matters | med |
| Check Irish sources first: Age Action Ireland, Garda, Central Bank, Scamwise | Searches found only older items [U] | Avoid duplicating or contradicting official advice | low |
| Add a "Is this on my bank's real list?" check to answers (e.g., the bank's real contact route) | FTC "check with a trusted person" [S] | Gives a safe action, not only a verdict | med |

## Gaps and things to verify before we rely on them
- Full text of UCLA 2026 (Alberts, Espiritu, Castel) for outcome numbers. [U]
- FTC principles PDF, wording. [U] (binary fetch)
- Jigsaw phishing quiz outcome data. None found. [U]
- Which? scam quiz. No page found. Check which.co.uk directly. [U]
- Get Safe Online and Age UK quizzes: not searched in this round. [U]
- Scam Spotter: not found in this round. [U]
- Current NNG older-adult article (the 2013 one is dated). [U]
- Irish data: searches returned only old or sponsored material. [U]
