# Scam-checker competitor research (Oct 2026)

Method: web search plus page reads. Most vendor claims are the vendors' own (press releases/blogs); marked "vendor claim". "Not verified" = could not confirm. Search results were US-only and sometimes dated (2023-2025), so check current status before relying on details.

## 1. Comparison table

| Tool | You give it | How it answers | After the verdict | Privacy | Cost / platforms | Older-user notes |
|---|---|---|---|---|---|---|
| Bitdefender Scamio | Paste text, links, QR codes, upload screenshots, or describe the situation | Chatbot verdict "safe or potential threat" plus tips; no fixed labels documented | Advice such as delete or block; "signals" suspicious elements and known scam matches | Needs Bitdefender account; retention not detailed (not verified) | Free (early access); web, WhatsApp, Messenger, Discord | Chat in familiar apps (WhatsApp); but account sign-up is a hurdle |
| Norton Genie | Screenshot/photo, copied text, link | Says if it looks like a scam and why, explains what the scammer wants, tips; follow-up chat | Next-step tips | Not verified | Free; web and iOS/Android app (2023 launch included Ireland) | Plain explanation of scammer's aim; reviewer said not always accurate |
| McAfee Scam Detector | Auto-scans texts (Android) or manual quick-check/upload of screenshot, message or link | Alert before opening; sensitivity setting High/Balanced/Low | Blocking/filtering | On-device claim applies to deepfake video only; text scanning location not stated (not verified) | Included in paid McAfee core plans; Android, iOS, PC | Automatic, no action needed; vendor claim ">99% accuracy" (unsourced independently) |
| Trend Micro ScamCheck / Check | Image/screenshot, text/email, URL, phone number; also WhatsApp/Messenger bot, Chrome add-on (older posts) | Likelihood that it is a scam | Alerts; spam-text blocking on paid tiers | Not verified | Free tier historically; paid extras; current WhatsApp bot status not verified | Many input types incl. phone numbers |
| Malwarebytes Scam Guard | Screenshot, pasted content, texts, numbers | Chat verdict, matches similar flagged cases, tips | One-tap report to Threat Intelligence (asks permission) | Reports only with permission (9to5mac) | Free per Feb 2026 press release; Italian page says Premium (conflict); mobile + desktop | Vendor claim: prevented high-risk fraud in 15% of interactions |
| F-Secure Text Message Checker / Scam Protection | Paste message plus sender (web beta); app auto-scans texts from non-contacts | AI verdict; warns not to open links | Harmful texts go to junk folder (app) | Content, sender, region, language collected; personal data anonymised within a month; verdict kept to train AI | Web checker free beta; app paid | Not designed for older users specifically |
| ScamAdviser / Get Safe Online "Check a website" | Website URL only | Trust score 1-100 from 40+ data sources | Points UK victims to Action Fraud | URL sent to service | Free; web plus browser extension | Cannot check shortened links or email addresses; score numbers can confuse |
| UK 7726 and report@phishing.gov.uk (NCSC) | Forward the text to 7726; email scams to report@phishing.gov.uk | No verdict; just a report | Provider investigates and may block sender; NCSC says 41.9K scams / 93.3K URLs removed (Sept 2026) | Sent to provider/NCSC | Free; any phone | Very simple: one number, step-by-step per phone type |
| Google Messages scam detection (Android) | Automatic, no action | "Likely Scam" warning in chat; block/report/mark safe options | Block or report | Google says on-device and content not sent unless you report (PhoneArena, Heise); one outlet (NextPit) says cloud: conflict | Free, default on, non-contacts only | Zero effort |
| Edge Scareware Blocker (Microsoft) | Automatic | Warns on full-screen fake virus/support pages | Can report to SmartScreen | Local model (Microsoft claim) | Free, default on most devices | Tip: hold ESC to close fake full-screen; targets tech-support scams |
| AARP Fraud Watch (US) | Phone call to helpline 877-908-3360; submit to scam map | Human specialist/volunteer advice | Referrals, emotional support, family guidance | Not verified | Free; phone + web | Human voice, peer support, translation |
| Carefull ScamCheck (US, for older adults) | Text, email, voicemail, physical mail | LLM verdict with step-by-step guidance | Steps on what to do | Not verified | Part of a paid platform; US | Built for older adults plus family monitoring (press release) |
| Irish: ComReg Sender ID Registry; Garda / BPFI FraudSMART | No checker. Registry labels unregistered senders "Likely Scam" (since 3 Jul 2025); FraudSMART/Garda publish alerts | Label by network | Garda: don't reply, ring the bank yourself, report to local Garda station if a victim | n/a | Free | Blocking phase deferred, no newer source found. No Irish forwarding short code verified (50050 NOT confirmed) |

Not found/verified: Which? scam tools, Citizens Advice "Scam Action" tool, any Irish consumer-facing paste-and-check tool.

## 2. Top 10 ideas, ranked (older-user value vs effort)

Client-side only unless marked [SERVER].

1. **"Check with someone" hand-off, one tap to a trusted person** (AARP human helpline/family guidance; Carefull family view). We already share results; make a pre-saved "My helper" button (name stored locally) that shares via WhatsApp/SMS. Why: older users trust a person over a tool. Low effort.
2. **Big "what to do right now" box first, with a single top action** (Norton Genie tips; Garda advice "don't reply, ring bank yourself"). Lead every result with 1-3 plain actions plus "Do not click / do not reply". Low effort.
3. **Per-phone step-by-step for deleting, blocking and reporting** (NCSC 7726 pages give iPhone and Android steps). Add illustrated-in-words block/report steps and the Irish equivalents (Garda, bank, provider). Low effort. Flag: verify the Irish operators' forward-to-report numbers before adding; I could not confirm one.
4. **Explain the scammer's goal in one sentence** ("They want you to ring a number so they can take your money") (Norton Genie). Partly there; make it a fixed sentence per scam type. Low effort.
5. **Tell the user what the tool can't see, and what a genuine contact looks like** (Scamio/ScamAdviser limits; Google "mark as safe" option is risky). Keep never saying "safe". Add "How to check it yourself: ring the number on your card/the official site". Low effort.
6. **Phone-number / website look-up guidance** (Trend Micro checks numbers; ScamAdviser/Get Safe Online check sites). We cannot look up live, so add "Check this website" instructions and links to the free official checkers, plus clear note that results aren't proof. Low effort. Live lookups need [SERVER].
7. **Fake tech-support / full-screen pop-up page** (Edge Scareware Blocker; hold ESC tip). Add a "My screen says I have a virus / call this number" guide and rule set. Low-medium effort. Fits Irish older users well.
8. **Voice/phone-call mode: "Someone is on the phone now"** (AARP helpline is call-based; no tool handles live calls). A short checklist page: hang up, ring back on a known number, never move money. Low effort, high value; none of the tools do this well.
9. **Optional "report to us"/anonymous trend sharing** (Malwarebytes asks permission to report; AARP scam map; Google report flow). [SERVER] needed; skip for now, but keep a "copy text to report" button for client side.
10. **WhatsApp/Messenger bot or auto-scan of incoming texts** (Scamio, Trend Micro, McAfee, Google, F-Secure). Highest convenience but [SERVER] (bot) or native app (auto-scan). Keep as long-term; Android Share-to is our nearest equivalent.

## 3. What we already do better

- Fully in-browser, nothing uploaded, no account, no sign-up. Scamio needs a Bitdefender account; McAfee/F-Secure use cloud or paid plans; Genie/Scamio/Malwarebytes send content to servers.
- Never says "safe" (Scamio and Google use "safe" wording or "mark as safe").
- Screenshots read on-device, with no upload.
- Irish-specific: customs fees, M50 tolls, Garda impersonation, Hi Mum, Irish reporting steps. No competitor found does this.
- Practise quiz (106 messages): none of the tools researched have anything similar.
- Share-safe result: links and emails deactivated in shared copy.
- Accessibility: text size, calm mode, read-aloud. None of the tools researched advertise these.
- Android Share-to and offline home-screen app, free.
- Honest limits stated; competitors rely on accuracy claims (McAfee >99%, vendor-claimed).

## 4. Sources

- Scamio: https://bitdefender.com/consumer/scamio ; https://www.bitdefender.com/en-gb/blog/hotforsecurity/am-i-being-scammed-finding-out-has-never-been-easier ; https://betanews.com/2023/12/14/bitdefender-launches-free-ai-powered-scam-detector
- Norton Genie: https://newsroom.gendigital.com/2023-07-25-Introducing-Norton-Genie-Real-Time-AI-powered-Scam-Detection-at-Your-Fingertips ; https://www.techfinitive.com/product-guides/how-does-norton-genie-work/ ; https://cybershack.com.au/announcements/norton-genie-a-free-and-easy-way-to-help-identify-cyberscams
- McAfee: https://www.mcafee.com/blogs/mcafee-news/introducing-mcafees-scam-detector-now-included-in-all-core-plans/ ; https://www.helpnetsecurity.com/2025/05/14/mcafees-scam-detector/
- Trend Micro: https://www.trendmicro.com/en_ie/forHome/products/trend-micro-scam-check.html ; https://news.trendmicro.com/2021/02/24/how-does-scamcheck-work/
- Malwarebytes: https://9to5mac.com/2025/06/06/security-bite-is-this-a-scam-malwarebytes-new-feature-can-tell-you-in-seconds/ ; https://www.malwarebytes.com/press/2026/02/17/malwarebytes-scam-guard-prevented-high-risk-fraud-in-15-of-interactions-protecting-users-from-1000-in-losses-or-significant-personal-risk
- F-Secure: https://www.f-secure.com/en/text-message-checker ; https://www.f-secure.com/en/total/scam-protection
- ScamAdviser / Get Safe Online: https://getsafeonline.org/checkawebsite ; https://www.nenaghlive.ie/news/business/854044/new-website-launched-to-combat-online-fraud.html (Irish coverage of a launch; details not read)
- NCSC 7726: https://www.ncsc.gov.uk/collection/phishing-scams/report-scam-text-message ; report@phishing.gov.uk seen only on third-party pages, e.g. https://www.ofcom.org.uk/phones-and-broadband/scam-calls-and-messages/what-to-do-about-a-scam-call-text-or-message
- Google Messages: https://www.phonearena.com/news/google-messages-update-enhanced-spam-protection_id164031 ; https://heise.de/-10304395 ; https://nextpit.com/google-android-ai-scam-detection-messages
- Edge: https://blogs.windows.com/msedgedev/27/stand-up-to-scareware-with-scareware-blocker/ ; https://windowslatest.com/2024/12/21/microsoft-edges-scareware-blocker-ai-detects-tech-scams-to-keep-windows-11-safe
- AARP: https://www.aarp.org/money/scams-fraud/helpline.html ; https://www.aarp.org/ScamMap
- Carefull: https://businesswire.com/news/home/20250409431672/en/Carefull-Introduces-ScamCheck-Technology-to-Help-Older-Adults-Amid-Growing-Scam-Threats
- Ireland: https://www.comreg.ie/sms-sender-id-registry/ ; https://irishtimes.com/ireland/2025/02/07/scam-texts-to-be-blocked-as-watchdog-unveils-text-messaging-register ; https://bpfi.ie/garda-siochana-fraudsmart-issue-alert-text-message-scam/ ; https://www.garda.ie/en/about-us/our-departments/office-of-corporate-communications/press-releases/2019/august/fraudsmart-text-message-scam-alert-august-2019.html
