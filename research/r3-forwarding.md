# R3: Existing "forward a suspicious message to us" services

Research date: 2026-10-21. Method: WebSearch plus WebFetch of primary pages where they loaded. Tags: [FETCHED] = read from the page itself. [SEARCH] = search-result snippet only, not opened. [UNVERIFIED] = claim not confirmed from a primary source, or sources conflict. Several sites returned 403/404 or redirects, noted per section. Reply wording was found for almost no service; where it is missing, that is stated, not guessed.

---

## 1. Bitdefender Scamio (WhatsApp / Messenger)
- **Source:** https://www.bitdefender.com/en-us/consumer/scamio [FETCHED]; https://www.bitdefender.com/en-gb/blog/hotforsecurity/am-i-being-scammed-finding-out-has-never-been-easier [SEARCH]
- **How to send:** Add Scamio as a WhatsApp contact via QR code or button link (the page gives a link, not a number: https://wa.link/l1kly7; its FAQ links a different one, wa.link/2e0bpo, so the page is inconsistent [FETCHED]). Messenger link: https://www.messenger.com/t/102488646283695 [FETCHED]. Forwarding is not explicitly described for WhatsApp; the page says "Add those fake ads, suspicious links, or social media messages to the chat" (Messenger) [FETCHED]. Upload images, paste text, or describe the situation [SEARCH].
- **Account:** Bitdefender account required, "you only need to do this once" [FETCHED].
- **Reply:** Says whether it is "safe or not", plus tips and a rating prompt [FETCHED]. A review reports it does not explain why it rates something as a scam [SEARCH]. No verbatim reply wording found.
- **Speed:** "in seconds" per a review [SEARCH].
- **Automation vs human:** Automated AI.
- **Screenshots/voice/languages:** Images supported per FAQ wording ("upload pictures or screenshots") [FETCHED]; voice and languages not stated.
- **Fake copies:** Not found.
- **Privacy:** "We only collect and use your personal data in accordance with our Privacy Policy." No retention period [FETCHED].
- **Cost:** Free [SEARCH]. Usage numbers: none on the page. The FAQ calls it "in an early access phase" [FETCHED].
- **Criticism:** A review notes AI output must be verified, especially "non-scam" verdicts [SEARCH].
- **Who runs it:** Bitdefender (commercial security vendor) [FETCHED].

## 2. Trend Micro ScamCheck (WhatsApp bot)
- **Source:** https://news.trendmicro.com/2021/02/24/how-does-scamcheck-work/ [SEARCH]; https://news.trendmicro.com/2020/11/17/identify-misinformation-and-scams-with-trend-micro-check [SEARCH]
- **Finding:** Could not confirm a current WhatsApp ScamCheck bot or a forwarding workflow. The older "Trend Micro Check" bot (2020) used typed input for emails/links and accepted screenshots, for Messenger and WhatsApp [SEARCH]. The current ScamCheck app's listing describes pasting, uploading images, or describing situations, with no WhatsApp bot mentioned [SEARCH, Apple listing]. [UNVERIFIED: whether the WhatsApp bot still exists.]
- Not fetched: the Trend Micro pages returned no primary text in search.

## 3. Singapore ScamShield (WhatsApp bot, plus 1799 helpline)
- **Bot sources:** https://www.scamshield.gov.sg/about-bot returned 404 on the gov.sg domain; the scamshield.org.sg version redirected there [FETCHED, failed]. Search snippets [SEARCH]: https://go.ask.gov.sg/scamshield ; https://mothership.sg/2023/02/new-scamshield-bot-whatsapp-telegram//amp [FETCHED].
- **How to send [SEARCH]:** Reach the bot at go.gov.sg/scamshield-bot. Send by copying text, sending a screenshot, or forwarding a message from another WhatsApp chat, plus scammer contact info and where it arrived. Mothership says the user "only need[s] to send the chatbot a message" and does not need the app [FETCHED].
- **Reply:** Wording and timing not found. The official FAQ at scamshield.org.sg/bot-faqs was not readable (redirect, then 404) [FAILED].
- **Automation vs human:** Bot checks; reports go to the Singapore Police Force for review, and the police see only the submitted info plus timestamp [SEARCH]. [UNVERIFIED: whether checks are fully automated.]
- **Usage:** The 2023 Mothership article gives figures for the ScamShield app, not the bot: more than 500,000 downloads, and over 3 million messages and calls screened [FETCHED]. No bot-specific numbers found.
- **Run by / funding:** Jointly developed by the National Crime Prevention Council and GovTech's Open Government Products [FETCHED, Mothership]. Government-funded (inferred, not stated).
- **Cost:** Free [SEARCH, "free S'pore govt bot"].
- **1799 helpline:** Separate 24/7 call centre. The Police advisory: "If you are in doubt, call the 24/7 ScamShield Helpline at 1799 to check." [FETCHED: https://www.police.gov.sg/Media-Hub/News/2026/03/20260327_advisory_on_phishing_scams_involving_whatsapp_messages_impersonating_sg_post]. The advisory does not mention the bot or forwarding.
- **Conflict:** reports.open.gov.sg describes ScamShield as a "mobile app" that lets people "check suspicious calls and messages, and report scams" [FETCHED]. This is the app; the bot is a separate channel.
- **Languages / screenshots / privacy / fake copies:** not found.

## 4. Taiwan Cofacts (真的假的, LINE)
- **Source:** https://ijnet.org/en/story/taiwanese-cofacts-fact-checks-information-line [FETCHED, 2018 article]; https://en.cofacts.tw/article/27u3csvhqgm75 [SEARCH].
- **How to send:** "Users who receive dubious messages on LINE can forward them to the Cofacts chatbot" [FETCHED].
- **Reply:** Human-reviewed; "Replies go back to the user only after this review"; if editors disagree, several replies can be sent [FETCHED]. Repeat messages are answered automatically from the database: "the chatbot was able to automatically answer 35,180 of them" [FETCHED].
- **Speed:** New messages get no immediate answer; the site notes this in Chinese (送出文章到資料庫的你並不會立刻得到該則謠言的解答) [SEARCH].
- **Numbers (Oct 2018, 3 months):** more than 46,000 messages; about 250 new messages a week; "less than 12 active editors" [FETCHED]. These are 2018 figures and are out of date.
- **Automation vs human:** Human volunteers for new items; automatic for duplicates. Some database entries carry an AI "preliminary analysis" [SEARCH].
- **Why built:** A rival fact-check account was swamped by repeat forwards [SEARCH].
- **Run by:** Volunteer-run, public collaborative database [SEARCH]. Funding not stated [FETCHED].
- **Privacy / screenshots / voice:** not found.

## 5. Taiwan Auntie Meiyu (美玉姨, LINE)
- **Source:** https://checkcheck.me/en [SEARCH]; https://www.bnext.com.tw/article/51769/meiyu-line-bot-hit-fake-message [SEARCH]; https://gogolook.com/newsroom/gogolook-2022-annual-fraud-report-messaging-software [SEARCH].
- **How to send [SEARCH]:** Forward a news article or circulating message; phone numbers and LINE IDs are also checked.
- **Reply [SEARCH, one blog source, indicative only]:** On finding a rumour, it shows "這是謠言" ("this is a rumour") with the facts. Exact wording not confirmed.
- **Automation:** Automated, checks multiple databases; phone numbers checked against Whoscall's database; LINE IDs against the Criminal Investigation Bureau database [SEARCH].
- **Numbers:** 1.67 million verifications in 2022 (Gogolook) [SEARCH].
- **Run by:** Created by Carol Hsu (end 2018); joined with Gogolook (Whoscall) in 2020 [SEARCH].
- **Cost / privacy / languages:** not found.

## 6. Whoscall (Gogolook, Taiwan/Hong Kong/Asia)
- **Source:** https://web.whoscall.com/en-US [redirect, not fetched]; https://www.whoscall.com/en/blog/articles/1249-2023_Whoscall_annual_report [SEARCH]; https://en.wikipedia.org/wiki/Whoscall [SEARCH].
- **Model:** Mainly a caller-ID and block app. It is not a forward-to-a-human service. The "SMS Assistant" "automatically scans and filters messages containing suspicious links" [SEARCH]. The URL scanner covered 230,000+ Taiwanese links in 2023, with more than 11% flagged as scams [SEARCH, Whoscall press].
- **Usage:** Vendor claims: over 6 billion unknown calls and SMS identified globally in 2025 [SEARCH, PR Newswire 2026]. Not independently verified.
- **Privacy:** App store labels list identifiers and tracking data; the app asks for phone, call log, contacts and SMS permissions [SEARCH]. Privacy policy at whoscall.com/en/privacy was not read [UNVERIFIED].
- **Criticism:** 2014 leak of officials' details on caller screens; Gogolook said it did not store the data [SEARCH].
- **Cost:** free tier not confirmed.

## 7. Netsafe NZ (plus DIA 7726 and scam@reportspam.co.nz)
- **Source:** https://netsafe.org.nz/scam-tips/ [SEARCH]; https://www.tcf.org.nz/digital-living/online-safety/report-a-scam [SEARCH].
- **Netsafe:** Report online at netsafe.org.nz/report. "Netsafe can't investigate or track scammers, but it can advise people who lost money or think they're about to." It uses reports for trend tracking and public education [SEARCH]. No forwarding, no personal reply.
- **Texts:** Forward to DIA's free number 7726 [SEARCH]. Police: if you lost nothing, you can report to Netsafe or forward to 7726 [SEARCH].
- **Emails:** scam@reportspam.co.nz (DIA's Electronic Messaging Compliance Team) [SEARCH].
- **Money lost:** bank first; NZ Police 105; 111 if in danger [SEARCH].
- **Replies:** none described in search results. [UNVERIFIED]

## 8. UK 7726 and report@phishing.gov.uk (NCSC)
- **Text, source:** https://www.ncsc.gov.uk/collection/phishing-scams/report-scam-text-message [FETCHED]. Steps: "Take a note of the number that sent you the message", then forward to 7726 (separate iPhone and Android steps). Provider "can investigate the origin of the text and arrange to block or ban the sender, if it's found to be malicious." "If 7726 doesn't work, you can find out how to report a text message by contacting your phone provider." Page does not say whether a reply is sent.
- **Email, source:** https://www.ncsc.gov.uk/information/report-suspicious-emails [FETCHED, but the address report@phishing.gov.uk is NOT on the page]. Page links to a "Report a scam email" page (not read). Address and outcome: [UNVERIFIED].
- **Scale (NCSC, Sept 2026 figures on a general page):** "more than: 59.6m reported scams"; "scams being removed across 466,300 URLs" [FETCHED].
- **Replies:** none stated. Operated by NCSC and mobile providers; free.
- **Attention:** The 7726 scheme is a provider-run scheme, so coverage varies by carrier [FETCHED].

## 9. India Chakshu (Sanchar Saathi, DoT)
- **Source:** https://sancharsaathi.gov.in/sfc/ [SEARCH]; https://retirement.outlookindia.com/... [SEARCH]. Not fetched directly (no primary page read).
- **How to send [SEARCH]:** Online form on the Sanchar Saathi portal for "Suspected Fraud Communication" by Call, SMS or WhatsApp. Also report the message inside WhatsApp "as per their policy". Keep a screenshot showing sender and content. Report each number separately.
- **Categories:** KYC/bank/electricity; impersonation of officials or relatives; fake customer care; job/lottery/loan; sextortion; robocalls; malicious links.
- **Money lost:** not handled; use 1930 or cybercrime.gov.in [SEARCH].
- **Reply:** Not described in search results. [UNVERIFIED]
- **Timing:** one source says report within 30 days [SEARCH, conflicting sources; UNVERIFIED].
- **Cost:** free [SEARCH].

## 10. Australia (Scamwatch / ACCC / ACMA)
- **Source:** https://www.scamwatch.gov.au/report-a-scam [FETCHED, 403, failed]; search snippets [SEARCH].
- **Spam SMS:** Forward to ACMA. Search snippet cites 0429 999 888 from an OLD Scamwatch page (2009–2010 era). [UNVERIFIED: current number.] Telstra forwarding number 7226 from an undated article [UNVERIFIED].
- **Scam reports:** via the report-a-scam form on Scamwatch (ACCC) [SEARCH].
- **Note:** The number 0303 30 30 in the brief was NOT found in any source [UNVERIFIED].

## 11. Meedan Check tiplines (Africa Check, PesaCheck, others)
- **Source:** https://meedan.org/post/one-of-year-of-running-the-end-end-to-fact-checking-project [SEARCH]; https://meedan.com/blog/multi-language-tiplines-and-media-literacy-pesachecks-fact-check-strategy-in [SEARCH]; https://meedan.com/programs/whatsapp-3pfc [SEARCH].
- **How to send [SEARCH]:** Send a message (text, screenshot, link, forwarded post) to the tipline number on WhatsApp. Africa Check also took screenshots on Twitter (2019).
- **Reply:** Human fact-checkers; results fed through Meedan's Check platform. Replies are by person. Time: fact-checkers generally need "a couple of days" for a new claim [SEARCH, 2025 study].
- **Numbers:** All ten tiplines (India, Brazil, South Africa, Kenya, Nigeria) "over 600,000 unique users and... over 15,000 fact-checks" as of Nov 2020 [SEARCH].
- **Run by / funding:** Meedan, with Facebook/WhatsApp support (2020) [SEARCH]. Newer program partners: 18 newsrooms (Brazil, India, Indonesia, Kenya, Mexico, Spain, US, Zambia) [SEARCH, undated].
- **Africa Check's current number:** not found [UNVERIFIED]. Maldita is in Spain; see section 12.

## 12. Maldita.es (Spain, WhatsApp chatbot)
- **Source:** https://maldita.es/recibe-los-desmentidos-de-maldito-bulo-en-whatsapp [FETCHED, only the title and banner were readable; the body was an image blob. Not read: steps and reply wording.] Search snippet [SEARCH].
- **How to send [SEARCH]:** Save +34 644 22 93 19 and say hello. The bot sends a video tutorial and a menu. Users send a WhatsApp chain, video, image, link or PDF. The bot searches Maldita articles that answer or give context. If there is no article yet, the query is stored for possible coverage.
- **Launch:** June 2020. "tens of thousands of people have used it" [SEARCH].
- **Older numbers** (2018, outdated): 655 19 85 38 and a Messenger BuloBot [SEARCH].
- **Human replies:** Early on, the team warned it was small and could be slow [SEARCH].
- **Cost / privacy:** not found.

## 13. Full Fact (UK)
- **Source:** https://fullfact.org/elections-2026/elections-whatsapp-tipline/ [SEARCH]; https://fullfact.org/blog/2021/jan/2021-you-can-reach-us-whatsapp/ [SEARCH].
- **Current model (2026, elections only):** Photograph offline material (leaflet, advert, poster) and message the WhatsApp number. Runs until 6 May. Email fallback: campaigns@fullfact.org. "The team can't check everything sent in, but submissions still help map the campaign" [SEARCH].
- **Earlier pilot (2021):** three months, more than 700 people, 1,100 messages, over 3,000 claims [SEARCH].
- **Reply:** not described [UNVERIFIED].
- **Note:** Full Fact is a fact-checker, not a scam-reporting service; its tipline is for claims, not for phishing.

## 14. Ireland (no equivalent found)
- **Source:** https://www.comreg.ie/... [SEARCH]; https://www.irishtimes.com/business/2026/06/25/up-to-26-million-scam-calls-intercepted-by-just-one-operator-last-year/ [SEARCH]; Garda guidance via Leinster Express and Meath Chronicle [SEARCH].
- **Result:** No Irish forward-a-text number was found in any source. [UNVERIFIED: the absence is only from these searches.]
- **Garda guidance:** report to local Garda station; contact your bank as soon as possible [SEARCH].
- **Regulation:** ComReg SMS Sender ID Registry, from May 2025; messages from unregistered sender IDs marked "Likely Scam" from 3 July 2025 and blocked from 3 October 2025. Person-to-person SMS are not covered [SEARCH].
- **Three Ireland:** more than 455,000 fraudulent SMS intercepted in 2025 [SEARCH].
- **Central Bank of Ireland:** not found in search results.
- **UK bank comparison:** Bank of Ireland UK "Check your text" forwards with the word CHECK to short code 50365 [SEARCH]. UK service only.

---

## What makes these easy for older people
- A single, fixed contact (7726, +34 number, a QR code) that a person can save or forward to in a few taps.
- Plain-language instructions with video tutorials (Maldita) and step-by-step phone-specific steps (NCSC 7726).
- Forwarding requires no copy-paste: the message goes as is (ScamShield, Cofacts, Chakshu screenshots).
- A reply that says safe / scam in plain words, plus a "what to do" line.
- Government or long-running public bodies (ScamShield, NCSC, Cofacts) carry trust.

## Lessons for us

**Do**
1. Take the fact-check route for repeat messages first. Cofacts' database answered about 75% of repeat forwards without a human (2018) [FETCHED]. Store every checked message and its answer; repeats are the bulk of the load.
2. Offer a single contact that does not need an app and works from a phone's share menu (7726 model, ScamShield bot model). Keep the page's instructions to a few steps with screenshots.
3. Ask for a screenshot, not a copied text. Chakshu tells people to keep a screenshot showing sender and content [SEARCH]. Ask users to include the sender number or email, since several services key on it.
4. Be explicit about what the reply means: "safe / scam / we could not tell". Scamio's reviewer noted an unexplained "non-scam" verdict is the main trust gap [SEARCH].
5. Tell people to report to the bank and Garda when money has gone. Chakshu, NZ and Garda all send money-loss cases elsewhere [SEARCH].
6. Publish a privacy line in plain words with retention, and state whether the forwarded content goes to a human. The bot pages we read give weak retention statements (Scamio) [FETCHED].
7. Plan a human fallback for unclear cases, and say how long it takes. Meedan and Maldita both warned about slow human replies [SEARCH].
8. Be ready for AI and bot limits: say the check is a guide and the reader must verify, as Scamio's reviewer advised [SEARCH].

**Don't**
1. Don't promise a fast reply. Services that route to humans say "a couple of days" (Meedan, Full Fact) [SEARCH].
2. Don't ask people to forward to an unverified number. Several listed numbers (Maldita 2018, Scamio's two WhatsApp links, ACMA 0429 999 888, Telstra 7226) are old or conflict across sources [FETCHED/SEARCH]. Verify before publishing.
3. Don't rely on 7726 for Ireland. It is UK-only; Ireland has no equivalent found [SEARCH].
4. Don't store and resell message content with unclear privacy. Whoscall's app-level data collection and the 2014 leak are a reminder [SEARCH].
5. Don't copy a reply template from any service without its permission. None of the reply wording found is verbatim.
6. Don't promise a cost-free model without funding. Public services are free because government or NGOs fund them; the funding for Cofacts (volunteer) and Meedan (grant) is not guaranteed [SEARCH].

## Gaps (not confirmed)
- Exact reply wording for ScamShield, Scamio, Cofacts (current), Maldita, Chakshu, 7726.
- Fake-bot protection (none of the sources described it).
- Current status of Trend Micro's WhatsApp bot, Auntie Meiyu's replies, Africa Check's tipline number, Full Fact's non-election tipline.
- Scamwatch / ACMA numbers (0303 30 30 not found).
- Irish equivalent: none found.
- report@phishing.gov.uk address: not on the NCSC page read.
