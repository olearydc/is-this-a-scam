# Forwarding service for "Is This a Scam?" - research and plan

Date of research: 21 Oct 2026. Not legal advice.
Marking used: **[V]** = checked against an official page this session (URL given). **[R]** = reported by a third party (vendor blog, news, reseller), not confirmed on an official page. **[U]** = unverified (my background knowledge or could not find a source); check before relying on it.

## 0. Headline findings

1. **Pricing changed on 1 Oct 2026, three weeks ago.** Free-form replies inside the 24-hour window (called "service messages") were free from Nov 2024. Meta has charged for them again since 1 Oct 2026, **except the first 1,000 delivered per business phone number per month**. [V] https://developers.facebook.com/docs/whatsapp/pricing/updates-to-pricing and https://developers.facebook.com/docs/whatsapp/pricing . The PROJECT-NOTES line "replies ... are currently free" is now out of date.
2. A reply-only bot (we never message first, no templates) avoids template approval, marketing rules and the messaging-tier limits entirely. That is the right design for us.
3. Meta's January 2026 "AI Providers" rule targets general-purpose AI assistants (ChatGPT-style). Our bot is a narrow, rule-based checker, so it should comply. Details in 1.9.
4. The webhook does tell us a message was forwarded (`context.forwarded`), but never who originally sent it. [R-strong, see 1.10]
5. The cheapest first step is **email forwarding on a Cloudflare Worker with no VPS**, because the rules are plain JavaScript. WhatsApp second. SMS last (Irish two-way SMS is awkward).
6. The biggest open question is whether Dan can pass Meta business verification as an individual in Ireland. Nobody's docs answer this. Test it early (Phase 2 step 1) before building anything.

## 1. WhatsApp Business Platform (Cloud API, hosted by Meta)

### 1.1 Accounts needed
- A Facebook/Meta account, a Meta developer registration, a **Meta business portfolio** (when creating the app you select or create one), and a WhatsApp Business Account linked to the app. [V] https://developers.facebook.com/docs/whatsapp/cloud-api/get-started
- A test number is provided in the dashboard for development (sends only to numbers you add as recipients). [V] same page.

### 1.2 Business verification: can an individual / sole trader do it in Ireland?
- **Not required for everything.** Verification is needed for certain API, advertising and billing features and "to scale". It is not needed to get a display name: since April 2024, meeting message-quality criteria and passing display-name review can enable one without full verification (rollout varies). [R, vendor doc] https://docs.360dialog.com/docs/resources/meta-business-verification.md
- For us, verification matters for: raising the number cap per portfolio from 2 to 20 (irrelevant), the 2,000 messaging tier (irrelevant, replies inside the window do not count) [V] https://developers.facebook.com/docs/whatsapp/messaging-limits , and possibly trust/blue tick (1.5). So **we may be able to run unverified.** [U: confirm production use of the Cloud API for your own number without verification or App Review.]
- If verification is needed: Meta asks for official documents proving the business exists; accepted types vary by country; common ones are utility bills, bank statements, business licences, certificates of incorporation; most rejections are name/address mismatches. [R] https://docs.360dialog.com/docs/resources/meta-business-verification.md
- Sole proprietor support: vendor guides say the Meta flow offers "Sole proprietorship" as a business type [R] https://help.sleekflow.io/en_US/verifying-facebook-business-account/facebook-business-verification . I found **no official Irish document list** and a report of a UK sole trader getting stuck without a company number [R] (Shopify forum thread found via search; https://community.shopify.com/t/cant-complete-shop-verification-for-facebook-and-instagram-on-shopify/184437/17). **Ireland status: unverified.**
- Practical route for Dan: register a business name with the CRO and as a sole trader with Revenue [U: fees and exact steps, check https://www.cro.ie and https://www.revenue.ie], put the name on a utility bill or bank statement, and make the website, domain WHOIS and Meta portfolio use that exact name. A BSP such as 360dialog can run verification for you at the end of onboarding or on request [R] https://docs.360dialog.com/docs/resources/meta-business-verification.md .

### 1.3 Phone number requirements
- Must be a number you own, with country and area code, able to receive voice calls or SMS. Short codes not supported. Toll-free must let the verification call through any IVR. [V] https://developers.facebook.com/docs/whatsapp/cloud-api/phone-numbers
- **Landlines allowed**: voice code "Standard", SMS code "Not Recommended"; call forwarding/IVR must be off. **VoIP/virtual numbers** also allowed with voice code. Pager and M2M/IoT not supported/recommended. [V] same page.
- The number **cannot be in use on the WhatsApp app** (delete that WhatsApp account first), and once registered with the Cloud API it can no longer be used in the WhatsApp phone app. [V] same page.
- So a cheap **Irish prepaid SIM** (a new number, never used on WhatsApp) is the simplest choice: receive the code once, then the SIM can sit in a drawer, but keep it topped up so Dan does not lose the number [U: operator expiry rules]. A virtual Irish number with voice also works but some Irish virtual-number providers have stopped new mobile activations (e.g. CloudTalk page, April 2026 [R] https://www.cloudtalk.io/numero-virtual-irlanda/ ).
- New portfolios start capped at **two** registered numbers. [V] same page.

### 1.4 Display name
- Required at registration; status goes PENDING_REVIEW, APPROVED or DECLINED. [V] https://developers.facebook.com/docs/whatsapp/cloud-api/phone-numbers
- Naming rules are in a separate "Display names" document I could not retrieve. [U] Known rule of thumb: must match the business/brand shown on your website, no generic words. Use "Is This a Scam" or similar and make sure the website says the same thing. Check https://developers.facebook.com/documentation/business-messaging/whatsapp/ for "display names".

### 1.5 Official Business Account / blue tick
- OBA numbers get a badge beside the name in contacts. [V] https://developers.facebook.com/documentation/business-messaging/whatsapp/business-phone-numbers/phone-numbers . Eligibility rules not retrievable. [U]
- A vendor doc says the badge is requested after verification and is separate from it. [R] https://docs.360dialog.com/docs/resources/meta-business-verification.md
- Do not plan on a badge for a sole trader; Meta typically wants notable brands. [U] Design so it works without one.

### 1.6 Messaging limits for new numbers
- Limits count **unique users messaged outside a customer-service window** in a moving 24 h. New portfolios start at 250; verification or 2,000 delivered template messages in 30 days unlocks 2,000; then 10,000, 100,000, unlimited. **Replies inside the window do not count.** [V] https://developers.facebook.com/docs/whatsapp/messaging-limits
- Conclusion: as a reply-only bot the 250 limit never applies to us.

### 1.7 24-hour window, templates, opt-in
- A 24 h window opens when a user messages or calls; each new user message resets it. Inside it you can send free-form "service messages" with no pre-approval; outside it only pre-approved templates. [V] https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages
- Opt-in: policy requires opt-in before messaging people; the page lists business-side sign-up methods and does not say whether a user messaging first counts. [V on text, interpretation U] https://developers.facebook.com/docs/whatsapp/overview/getting-opt-in . In practice replying to an inbound message in the window is the normal use. We never start conversations, so we avoid the issue.
- Design rule: **no templates, never message first**. Everything is a reply within seconds, well inside 24 h. This also makes it impossible for our number to "cold-message" anyone, which helps the impersonation story (section 7).
- Interactive replies: up to 3 reply buttons, and list messages. [V] same send-messages page. Use for the follow-up menu (section 8). Text length limit: not stated on that page [U] (WhatsApp text bodies allow about 4,096 characters; keep replies under ~1,200 anyway).
- Link previews are off unless `preview_url: true`. Leave it off. [V] same page.

### 1.8 Webhooks and media
- Inbound messages arrive as a `messages` array (`from`, `id`, `timestamp`, `type`, `text.body`); `contacts[].profile.name` and `wa_id` give the sender's WhatsApp name and number; `statuses` arrive for our outgoing messages. [V] https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages
- Setup details: HTTPS endpoint, GET verification with a verify token, POST signature header `X-Hub-Signature-256` signed with the app secret. [U, standard Meta webhook behaviour; confirm in the docs when building]. Reply 200 quickly and de-duplicate by message `id` (Meta retries). [U]
- **Media (images, voice notes):** the webhook carries a media id; you GET the media URL with your access token; **URLs expire after 5 minutes**; downloads need the Authorization header. Images JPEG/PNG up to 5 MB; audio AAC/AMR/MP3/M4A/OGG(Opus) up to 16 MB; documents up to 100 MB. Media IDs from webhooks expire after 7 days. [V] https://developers.facebook.com/documentation/business-messaging/whatsapp/business-phone-numbers/media
- Retention at Meta: the above page says media you *upload* is kept 30 days; for inbound message data, 360dialog documents a maximum of 30 days in Cloud API. [R] https://docs.360dialog.com/docs/waba-basics/architecture-and-security . [U] confirm in Meta's own docs before writing the privacy notice.

### 1.9 Pricing (2025-2026 model)
- **Per-message pricing since 1 Jul 2025** (not per conversation). You pay per delivered message; user-to-business messages are free. Rate depends on category and recipient country. [V] https://developers.facebook.com/docs/whatsapp/pricing
- Categories: Marketing, Utility, Authentication (templates); Service (free-form reply in window); plus a "Meta Business Agent" AI category from 1 Jul 2026 at $2 per million tokens, not relevant to us. [V] same page.
- **Service messages: free Nov 2024 to 30 Sep 2026; charged from 1 Oct 2026, first 1,000 delivered per business phone number per month free**; allowance does not roll over, resets monthly in the account's timezone. **If no payment method is on file, Meta will not deliver service messages once the free tier is used.** [V] https://developers.facebook.com/docs/whatsapp/pricing/updates-to-pricing
- That last point is a free **hard cap**: with no card on file, the bot simply stops at 1,000 replies a month. Good for a low-budget start; bad if people get no answer (so add a "we are at capacity, try the website" fallback if you add a card later). Behaviour for the failed send: [U].
- **Exemption:** eligible governments and community non-profits (public health, crisis response, non-partisan civic engagement etc.) keep service messages free beyond the tier through 31 Dec 2027; Meta planned an eligibility check by 30 Oct 2026. [V] https://developers.facebook.com/docs/whatsapp/pricing/updates-to-pricing . An individual would not qualify; a registered charity/CLG might. Not worth chasing at the start.
- **Free entry point windows** (Click-to-WhatsApp ads): replies are free for up to 7 days after the user starts from such an ad (the official page now says 7 days). [V] https://developers.facebook.com/docs/whatsapp/pricing . Not relevant unless we run ads. A plain `wa.me` link on a website is **not** an ad, so no free window. [U]
- **Ireland rate:** Ireland is in "Rest of Western Europe" (Austria, Belgium, Denmark, Finland, Ireland, Norway, Portugal, Sweden, Switzerland). [V] https://developers.facebook.com/docs/whatsapp/pricing/updates-to-pricing . Meta's page did not show the numbers to my fetcher. A reseller's copy of the rate card gives **$0.0171 for utility/authentication/service** and $0.0592 marketing, effective 1 Oct 2026 [R] https://zernio.com/whatsapp-api-pricing (same values in an Oct 2025 card https://www.gupshup.ai/resources/wp-content/uploads/2025/10/USD_Oct2025.pdf ). Another source says service is billed at the utility rate [R] https://docs.gallabox.com/pricing-and-billing/whatsapp-pricing/rate-card.md . **Treat $0.0171 per paid reply as a good planning figure, but confirm in the Meta rate card in the dashboard.**
- Billing currency, VAT: [U]. Add a VAT allowance of 23% when estimating, as an Irish customer may be charged VAT on Meta fees.

### 1.10 Meta policy on chatbots (the Jan 2026 AI rule)
- Meta's WhatsApp Business Solution Terms were changed to add an "AI Providers" section: providers of AI technologies (large language models, general-purpose assistants) cannot use the Business Solution when the AI is their **primary** (not incidental or ancillary) functionality. New API users from 15 Oct 2025; all users from 15 Jan 2026. [R] https://techcrunch.com/2025/10/18/whatssapp-changes-its-terms-to-bar-general-purpose-chatbots-from-its-platform and https://respond.io/blog/whatsapp-general-purpose-chatbots-ban . Official page: https://www.facebook.com/legal/Meta-Terms-for-WhatsApp-Business-Platform (**my fetcher could not read it; quote the clause yourself before launch**).
- A search snippet of the official terms says the carve-out covers WhatsApp users with **EEA or Brazil phone numbers** (another outlet said Italy and Brazil only). [R/U, conflicting]. If true, the rule would not even apply to Irish users, but do not rely on it.
- Allowed per Meta and commentary: narrow, structured business automations (support triage, bookings, FAQs); AI used incidentally to deliver a business service. [R] respond.io above; Meta told TechCrunch customer-service use is unaffected.
- **Assessment: our checker complies.** It is a single-purpose, rule-based tool (not an open-domain assistant, no LLM in the loop, no free-form Q&A). Keep it that way: **do not add an "ask me anything" or LLM chat mode on WhatsApp**, and if an AI second opinion is ever added, make it a fixed-purpose step, not open chat. Meta keeps discretion on what counts. [R]
- Other policy to read once: WhatsApp Business Messaging Policy (opt-in, quality, prohibited content). Scam-warning content is not prohibited, but quoting scam text back may trip spam/quality filters, another reason to defuse links.

### 1.11 Forwarded-message metadata
- Inbound messages carry a `context` object; `forwarded: true` for messages forwarded 5 times or fewer, `frequently_forwarded: true` for more than 5. Present only when a user forwards a message **to the business**. [R-strong] Meta's own sample payloads per search result of https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages/text ; Twilio exposes the same as `Forwarded` and `FrequentlyForwarded` https://www.twilio.com/en-us/changelog/new-parameters-in-callbacks-for-inbound-whatsapp-messages
- **Original sender is not exposed.** The webhook only shows the forwarder (`from`, profile name). [U: no field exists in the docs I read; consistent with WhatsApp design.] So rules that depend on "who sent it" cannot work on WhatsApp; the reply should say so ("I can't see who sent it to you").
- Use `frequently_forwarded` as a mild extra signal ("this has been passed round many times - chain messages are a common way to spread scams and hoaxes"). Never as a verdict.

## 2. Providers: Meta direct vs BSPs

Assumptions for the table: 1 check = 1 inbound + 1 reply (service message). Meta's 1,000 free replies per number per month. Paid Meta reply = $0.0171 [R]. USD, before VAT. "Direct" = Cloud API from Meta, no middleman.

| Provider | Monthly fee | Per-message extra | Setup effort | Source |
| --- | --- | --- | --- | --- |
| **Meta Cloud API direct** | $0 | none | Highest: own webhook, token handling, verification, no support | https://developers.facebook.com/docs/whatsapp/pricing |
| **Twilio** | none listed | $0.005 per message **inbound and outbound** + Meta fee | Medium: Twilio WhatsApp sender onboarding (needs Meta business portfolio too); webhook is simple form-encoded; includes Forwarded flags | [V] https://www.twilio.com/en-us/whatsapp/pricing |
| **Bird (MessageBird)** | $0 pay-as-you-go; $15 Startup deposit; $100 Growth | $0.005 per **outbound** message + Meta fee; inbound not charged; pay-as-you-go send API limit 10/min | Medium | [V] https://bird.com/en-us/pricing/whatsapp |
| **360dialog** | EUR 49 per number (Regular), 99 (Premium), 500 (Scale) | Meta fees passed through, no markup | Low-medium; offers help with business verification | [V] https://360dialog.com/pricing |
| **WATI** | Plans start higher; base prices not captured. Cheapest plan with API (Growth) has **no webhooks**; Pro has "limited webhooks" | markup not stated | Built for sales teams, not for custom bots; poor fit | [V partial] https://www.wati.io/pricing/ |
| **Vonage** | not retrieved (403) | not retrieved | - | [U] https://www.vonage.com/communications-apis/messages/pricing/ |
| **Infobip** | not retrieved | not retrieved | - | [U] |

### Monthly cost at different volumes (replies only, planning estimate)
Meta paid reply = $0.0171 beyond the first 1,000 per month. One reply per check.

| Checks/month | Meta direct | Twilio (adds $0.005 x 2 msgs per check) | Bird (adds $0.005 per reply) | 360dialog (EUR 49 + Meta) |
| --- | --- | --- | --- | --- |
| 100 | $0 | ~$1 | ~$0.50 | ~EUR 49 |
| 1,000 | $0 | ~$10 | ~$5 | ~EUR 49 |
| 3,000 | ~$34 (2,000 x .0171) | ~$64 | ~$49 | ~EUR 83 |
| 10,000 | ~$154 | ~$254 | ~$204 | ~EUR 200 |

Add roughly 23% VAT if charged [U]. If every check sends two messages (verdict + follow-up menu answer), double the paid-message count. Add about EUR 5-10 one-off for the SIM and about EUR 1-2 a month for a domain [U].
Does Twilio's Meta pass-through include the 1,000 free? Twilio's page says "Service messages include a free tier that resets monthly" [V] https://www.twilio.com/en-us/whatsapp/pricing , so assume yes, but check.

**Recommendation:** Meta Cloud API direct. A BSP adds cost and a second party who sees the messages (another GDPR processor to list). The only reason for a BSP would be help passing verification (360dialog) or a nicer sandbox (Twilio). Twilio is the best "toe in the water" for development because its sandbox needs no business verification, but its production sender still needs a Meta business account. [U on sandbox]

## 3. Unofficial libraries (whatsapp-web.js, Baileys): why not
- They automate WhatsApp Web / reverse-engineer the protocol on a personal or ordinary business number. That breaches WhatsApp's Terms of Service (automated or bulk messaging and use of unauthorised clients) and numbers get banned, sometimes without notice. [U for exact clause; see https://www.whatsapp.com/legal/terms-of-service ]
- The ban would hit the one number printed on the leaflet, breaking trust and the service at once.
- No Meta delivery guarantees, no support, breakages whenever WhatsApp changes its protocol, and your own phone's privacy data is exposed to the library.
- It also muddles GDPR (no Data Processing Terms with Meta, the message content passes through an unofficial route).
- Verdict: do not use, even for testing with the real number. For development use the official test number.

## 4. SMS and email

### 4.1 SMS in Ireland
- **Twilio (Ireland SMS guidelines):** two-way SMS supported, but **domestic long codes are not supported by Twilio**; international long codes work but Meteor and Three Ireland deliver best-effort and may replace the sender with an alphanumeric ID; **short codes not supported** by Twilio or the operator network; alphanumeric Sender ID needs pre-registration (about 2 weeks). [V] https://www.twilio.com/en-us/guidelines/ie/sms . So people could not simply text a normal Irish number and get a reply via Twilio. Pricing: outbound $0.0779 per segment, inbound $0.0075 per segment. [V] https://www.twilio.com/en-us/sms/pricing/ie
- **ComReg SMS Sender ID Registry:** live; organisations using alphanumeric Sender IDs to Irish mobiles must register; unregistered IDs are labelled "Likely Scam" since 3 Jul 2025; the blocking phase (planned 3 Oct 2025) was deferred with no new date found; 5-digit short codes and ordinary mobile numbers do not need registering; rules v2.0 published 27 Feb 2026. [V via search result summary] https://www.comreg.ie/sms-sender-id-registry/ and https://www.comreg.ie/senderid and rules https://www.comreg.ie/media/2026/02/SMS-Sender-ID-Registry-Rules-Of-Registration-Version-2.0-27-02-2026.pdf . Our replies would come from a **number**, not an alphanumeric ID, so registry impact is small. [U]
- Irish mobile numbers from providers: Telnyx and Zoom Phone mention Irish numbers, but SMS capability and the regulatory bundle (proof of address and identity) are unclear [R/U] https://telnyx.com/phone-numbers/ireland.md , https://www.zoom.com/de/phone-number-requirements/ireland/ .
- Alternative: a **cheap Irish SIM with a GSM modem** or an SMS gateway app on an Android phone at home is possible but fragile [U]. Another alternative is an Irish SMS aggregator that rents a 5-digit short code; ComReg's rules for short codes: [U, not found].
- Each SMS reply also costs about 8 cents, so an SMS check costs roughly **5x a WhatsApp check**. Also the scam text arrives *on the same SMS app*, so sending it on is the hard part for the user (see 7.4).
- **Verdict:** last priority; ask Irish providers (e.g. via Twilio support or a local aggregator) for a quote before designing.

### 4.2 Email forwarding
- **Cloudflare Email Workers** (free-ish, no server): a Worker receives each message (`from`, `to`, `headers`, raw MIME up to 25 MiB), parse with `postal-mime`, and can reply with `message.reply()`. [V] https://developers.cloudflare.com/email-routing/email-workers/
- **Reply restrictions:** `reply()` only works if the incoming email has a valid DMARC result, one reply per event, the reply recipient equals the incoming sender, the reply sender domain equals the receiving domain, and References has at most 100 entries. [V] same page. These restrictions make the service hard to abuse as a spam relay, which is good. Gmail, Outlook.com, Eir and Virgin Media are normally DMARC-aligned [U].
- Free plan CPU limits for Workers may be too tight for heavy regex rules (10 ms CPU on the Free plan; Paid plan $5 a month gives far more) [U, check https://developers.cloudflare.com/workers/platform/limits/ ]. If the rules run too slowly, the Worker can instead `fetch()` the VPS.
- **Forwarding as attachment** keeps the original headers (Received, Authentication-Results, Return-Path), which is what the existing "email's hidden details" checks need. The attached email arrives as a `message/rfc822` part; `postal-mime` can parse it recursively [U]. Normal "Forward" strips these; so give two instructions: "Gmail: Forward as attachment" (three-dot menu in desktop Gmail) and "Outlook: Forward as attachment" (Home > Forward > As attachment), both from the existing site pages.
- **Postmark:** inbound processing is included in Pro ($16.50/month, 10,000 emails) and Platform ($18); the free plan is 100 emails/month with no overage and no listed inbound. [V] https://postmarkapp.com/pricing
- **SendGrid:** free plan retired 27 May 2025; 60-day trial then from $19.95/month. [R] https://dreamlit.ai/blog/best-sendgrid-alternatives . **Mailgun:** sources conflict on free plan and inbound routes. [R/U] https://resources.rework.com/tools/messaging-sms/sendgrid-vs-mailgun
- **Self-hosting mail on the netcup VPS (Postfix):** receiving works; sending from a fresh VPS IP risks spam folders, and many VPS providers block outbound port 25 (I found nothing netcup-specific). [R/U] https://findstack.com/resources/port-25-blocked-vps . Not recommended.
- **Recommended email design:** Cloudflare Email Routing -> Worker (rules in the Worker) -> reply from `check@<domain>`. Cost: domain + maybe $5/month. Needs the domain on Cloudflare DNS.

## 5. Architecture for the netcup VPS

### 5.1 Shared rules module
- In `index.html` the code between the comments `reference lists` (line 542) and `theme and code rain` (line 1096), including `analyse(text, hReg)` at line 856, uses no page elements. Move it to **`checker-core.js`**, an ES module/UMD file: `export function analyse(text, hReg)`. The page loads it with `<script type="module">` (or classic script exposing a global); the Node server and the Cloudflare Worker `import` the same file. Keep a Node test that runs the 106 practice messages through it. Remember to add it to the service worker cache list (`sw.js`) so the page still works offline.
- Add a `formatReply(result, {channel})` function in a second file (`reply-format.js`) so wording matches the website. Reuse the existing "switch off links" function used by the share feature.

### 5.2 Components (WhatsApp)
```
Phone --> WhatsApp --> Meta Cloud API --webhook POST--> Caddy (HTTPS) --> Node service (127.0.0.1:3000)
                                                                             |-- verify X-Hub-Signature-256
                                                                             |-- drop if not text/image
                                                                             |-- rate-limit by hashed wa_id
                                                                             |-- image? download (5 min URL) -> tesseract OCR -> delete
                                                                             |-- analyse() -> formatReply()
                                                                             '-- POST reply (preview_url false)
```
- **Node 22 LTS**, one small process under systemd, Caddy in front for automatic HTTPS. Dependencies: none required except maybe `tesseract` CLI. No database needed: keep the rate-limit counters in memory (lost on restart is fine).
- **Domain:** needed for HTTPS and for the email address; also nice for the privacy page. Meta requires an HTTPS webhook URL with a valid certificate [U, standard]. Use a cheap domain (about EUR 10-25 a year [U]; .ie needs proof of Irish connection [U]).
- **OCR:** `tesseract` (apt) with the English model, run as a child process with a 10-15 s timeout and 5 MB limit; a 2-vCPU netcup VPS handles a few images a minute [U]. Photos of phone screens are noisy, so say "I read this from the picture, check the words are right" and show the extracted text back. Delete the image and the extracted text from memory straight after. Optionally pre-process (grayscale, upscale) with `sharp` [U].
- **Voice notes:** skip in v1. Reply: "I can't listen to voice notes yet. Please forward the text message or send a screenshot." Reasons: transcription (local Whisper) is CPU- and RAM-heavy, scam voice notes are rarer, and an AI-cloned voice is not detectable by our rules anyway. If ever added, use a small local model, delete after. Voice audio size cap is 16 MB. [V] media page.
- **Rate limiting / abuse:** per sender (hashed `wa_id`): e.g. 10 checks a day and 3 per minute; a global daily cap (e.g. 500 to match the 1,000 free replies); message length cap (e.g. 5,000 characters); ignore anything not text/image; reply once per message `id` (de-duplicate); a "kill switch" environment variable; set a Meta spend/payment-method decision (see 1.9). Respond to over-limit users with one polite message, and after 3 over-limit hits stop replying (avoid paid ping-pong).
- **ReDoS:** the rules contain many regexes run on untrusted input. Run `analyse()` in a `worker_threads` worker with a timeout (about 2 s), and cap input length. [U, but a real risk with public-facing regex]
- **Logging without content:** log only timestamp, channel, hashed sender (HMAC with a secret rotated monthly), message type, verdict level, rule ids fired, processing ms, error codes. Never log body, image, OCR text, names, or raw numbers. Turn off access logs for the webhook path in Caddy. Keep logs 30 days maximum, rotate with logrotate. Disk: enable full-disk encryption if netcup offers it or at least restrict ssh to keys. [U]
- **Security basics:** non-root service user, UFW allowing 80/443 and ssh only, unattended-upgrades, ssh keys only, secrets in a root-owned env file (access token as a System User token, never a personal token), backups of config but not data, monitoring via a simple uptime ping. Webhook should also validate `phone_number_id`. [U]
- **Replies:** one message, under about 900 characters if possible. Never include a clickable link except our own website URL (which we do want clickable). Defuse everything else: `an-post[.]ie`, `hxxps`, brackets around dots and `@`. WhatsApp also auto-links phone numbers: format them as "0 8 5 ..." spaced if quoted [U].

### 5.3 Email variant
- Worker does the whole job (no VPS). VPS only needed if the CPU limit is a problem. No images/OCR on email in v1, or process image attachments on the VPS.

## 6. Legal and privacy (GDPR)

Not legal advice; ask the Data Protection Commission (DPC) helpline or a solicitor for a short review before launch.

- **Dan is the controller.** The household exemption does not apply to a public service. Message content is personal data (names, numbers, bank details, third parties' data in forwarded messages). Special-category data is possible (health, in a scam message). Registering with the DPC is not needed for most controllers [U], but a Records of Processing entry is good practice (small organisations are partly exempt only if processing is occasional; ours is regular) [U].
- **Lawful basis:** probably legitimate interests (Art 6(1)(f)) for processing the content to give the answer the person asked for, or consent by the clear act of sending it. Choose one, write it down, do a short legitimate-interests assessment. [U/legal view]
- **Data minimisation and retention:** process in memory, reply, discard. Zero stored content. Logs hold only hashed ids and rule ids for 30 days. Say that plainly. Rate limiting needs a short-lived identifier; keep it in memory.
- **Meta's role:** for the Business Platform, Meta's WhatsApp Business Data Processing Terms treat Meta as processor for the business's personal data (terms dated 16 Feb 2024). [R, not fully read] https://whatsapp.com/legal/business-data-processing-terms?l=bg . Vendor docs say Cloud API retains messages up to 30 days for retransmission and that other Meta parts do not access message content nor use it for ads. [R] https://docs.360dialog.com/docs/waba-basics/architecture-and-security . **The WhatsApp app messages themselves are between the user and Meta (WhatsApp Ireland), not under our control.** Also Meta stays an independent controller for some account/metadata data [U]. Say in the notice: "We use Meta's WhatsApp Business service; Meta handles messages for up to 30 days [verify]."
- **Transfers to the US:** if Meta's Cloud API processes data in the US, the transfer relies on the EU-US Data Privacy Framework or standard contractual clauses [U which]. The DPF survived the General Court challenge on 3 Sep 2025; an appeal (C-703/25 P) is pending at the Court of Justice. [R] https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20251201-european-court-of-justice-to-review-challenge-to-eu-us-data-privacy-framework and https://ieu-monitoring.com/editorial/microsoft-backs-eu-commission-in-eu-court-case-on-transatlantic-data-flows-and-privacy/1244467/ . Mention it in the privacy notice in one sentence. The DPC's 2023 fine against Meta on transfers shows it takes this seriously. [R] https://www.iubenda.com/en/blog/meta-faces-ruling-from-irish-dpc-key-highlights-of-the-decision/
- **Privacy notice (Art 13):** must be easy to find: put the link in the leaflet, on the website, and in the footer of every reply ("We do not keep your message. Privacy: <short url>"). Contents: who we are (Dan, contact email), purposes, lawful basis, recipients (Meta/WhatsApp, Cloudflare for email), transfers, retention, rights (access, erasure, complaint to the DPC), no automated decisions with legal effect (the verdict is advice only). DPC small-business material: https://dataprotection.ie/en/organisations (pages "Know Your Obligations", "ARC SME Awareness" [V partial]).
- **Third-party data:** forwarded messages may contain other people's data. Tell users not to forward private conversations or documents, and what to remove.
- **Sending personal data to us by mistake:** the system should reply with "this looks like it contains bank/PPS/card details; please do not send these to anyone" if it detects them (it already detects patterns) and still discard them.
- **Age:** WhatsApp has its own minimum age; the service is aimed at older adults, but anyone may message it. No special action beyond a plain notice [U on WhatsApp's current minimum age in the EU; check https://www.whatsapp.com/legal/terms-of-service ].
- **Accessibility:** the website has WCAG AA work done. WhatsApp replies are plain text, short sentences, no emoji clutter (a single tick/warning symbol at most), numbered steps; users can enlarge text with their phone settings. The European Accessibility Act (applying since June 2025) exempts microenterprises providing services [U, check].
- **README change.** "Nothing you paste is sent anywhere" must be narrowed, not deleted: "On the website, the check runs in your browser and nothing is sent anywhere. If you choose to forward a message to our WhatsApp number (or email address), that message is sent to our server and to WhatsApp (Meta) so we can reply. We do not keep it. Details: <privacy page>." Also update the Privacy section, the privacy statement on the page, the PROJECT-NOTES line on free replies, and the "Ideas for later" list. Ensure the offline-capable web check does not start calling the server.
- Scam-specific legal point: do not collect reports for sharing with the Gardaí; just point to Garda and CCPC advice already in the site. If you later want to share scam samples (to train rules), that is a new purpose needing consent and its own notice.

## 7. Pitfalls and risks

1. **Scammers impersonating our number.** Mitigations: our number is never in a reply asking for anything; we never message first (no templates), so "Is This a Scam? is contacting you" is by definition fake; publish the number only on the website, leaflet, and in the About page; add a line to the page and every reply: "We never phone, text or message you first and never ask for money or codes." Consider the OBA badge if available (1.5), and the QR code on the leaflet (section 8). Watch for lookalike display names [U]. Make the website's "official contact" page the single source of truth.
2. **Forwarding scams from family without understanding.** The reply must be written for the forwarder: "Someone sent you this and you passed it on. It looks like..." Add: "Tell the person who sent it to you." Never assume the forwarder is the target.
3. **False reassurance.** Never say "safe". Use levels: "Looks suspicious", "Has some warning signs", "I couldn't find warning signs, which does not mean it is safe". Always end with the verify step: contact the company on a number you already have.
4. **People forward the wrong thing / can't forward.** Most scam texts arrive as SMS, not WhatsApp, and SMS cannot be forwarded to a WhatsApp contact in one step on iPhone [U]. Android: share sheet from the Messages app -> WhatsApp -> contact [U]. Be honest on the website about which route works for which phone, and keep the website paste/screenshot route.
5. **Message volume spikes** (a news story, a scam wave). 1,000 free replies vanish quickly and costs jump. Use the daily global cap, a spend alert (if a card is ever added), an auto "busy" reply, and a kill switch. A viral post at 10,000 checks would cost about $154 (section 2).
6. **Meta account bans or restrictions.** Causes: low quality ratings from users blocking/reporting the number, content flagged as spam/scam text quoted back, policy interpretation (the AI rule), failed verification. Mitigation: replies only to people who messaged first; never quote the scam; keep a backup channel (email and website); keep the Meta business portfolio's admin contacts and 2FA current; appeal path via Meta Business Support [U].
7. **People sending personal data** (bank statements, ID, PPS numbers, medical details). Minimise, auto-warn, never store. Also consider users sending abusive/illegal images: ignore non-matching media, log type only.
8. **Support burden for one person.** Put a clear "this is a free hobby service, replies are automatic" line; add an email contact for problems; set expectations on hours. Don't offer to "investigate" or call anyone. Avoid a general inbox: unsupported message types get a standard reply.
9. **Reply costs and the 24-hour window** are not a problem for one reply per message (inside 24 h by definition). If processing fails, send a short "couldn't read that, try the website" reply rather than silence; retries must not double-bill.
10. **Rule limitations carry over:** English only, no sender info on WhatsApp (1.11), screenshots may be mis-read by OCR. The reply should state these limits briefly.
11. **Number recognition and trust.** Older people may distrust a "scam checker" they can't verify. Use a recognisable contact name ("Is This a Scam? (free)"), a profile picture and description (WhatsApp business profile: description, website, email [U]), launch via trusted local channels (library, credit union, Garda crime-prevention, Age Action, Active Retirement groups) [U], and the leaflet QR code.
12. **Number longevity:** if the SIM lapses, the number is recycled and a stranger inherits a printed leaflet number. Keep it topped up, set a calendar reminder, and decide who owns the number if Dan stops.
13. **Dan personally liable** while there is no company: a wrong "no warning signs" could be blamed for a loss. Mitigate with clear wording, a terms page ("advice only, not a guarantee"), and consider a CLG/charity or at least liability insurance later [U].

### 7.1 Exact steps for older people to forward a message
Save the contact first. Then (steps checked against secondary guides only [R] https://rfgcreative.com/misc/how-to-forward-a-message-from-whatsapp.html ; **test on a real Android and iPhone before printing**):

**Android (WhatsApp):**
1. Open the chat with the suspicious message.
2. Press and hold your finger on the message until it turns coloured (highlighted).
3. Tap the **forward arrow** at the top right of the screen.
4. Choose **"Is This a Scam?"** from the list (or type its name in the search box).
5. Tap the green **send arrow**. Our reply arrives within a few seconds.

**iPhone (WhatsApp):**
1. Open the chat with the suspicious message.
2. Press and hold the message until a small menu appears.
3. Tap **Forward**.
4. A circle appears beside the message; tap **the arrow at the bottom** (check the exact corner on your phone; guides differ).
5. Tap the name **"Is This a Scam?"** (or search), then tap **Send**.

**If it came by text message (not WhatsApp):** Android: press and hold the text, tap Share (or the three dots, then Share), choose WhatsApp, then our contact [U]. iPhone: you cannot send a text straight to a WhatsApp contact; copy the text (press and hold, Copy), open our chat in WhatsApp, press and hold in the message box, tap Paste, then send [U].
**Never tap any link in the message first.** Also: forwarding uses the person's data allowance and WhatsApp limits on frequently forwarded messages do not stop forwarding to a single chat [U].

## 8. Ideas and reply formats

### 8.1 Reply design rules
- Max ~12 short lines; the verdict first; at most 3 reasons; one clear action; footer.
- Wording levels (never "safe"): "Very likely a scam", "Looks suspicious", "Some warning signs", "No warning signs found, but I cannot promise it is genuine".
- Links and addresses defused with `[.]`; our own site link is the only real link.
- Footer: "Free service. We do not keep your message. Never reply to a message like this. Privacy: <short link>."

### 8.2 Three sample replies (links defused)

**A. Parcel fee text (high risk)**
> I checked the message you forwarded.
> *Very likely a scam.*
> Why:
> 1. It says you owe a small fee for a parcel. Real delivery firms rarely ask for card details by text.
> 2. The link goes to "an-post-redelivery[.]top", not An Post's real website (anpost.com).
> 3. It tries to rush you ("within 24 hours").
> What to do: do not tap the link or enter card details. Delete the message. If you are expecting a parcel, check using the company's own app or website, which you type in yourself.
> If you already paid, ring your bank straight away.
> Reply *1* to send this to a family member, *2* for how to report it, *3* for another check.
> Free service. We never keep your message. Never message you first or ask for money or codes.

**B. "Hi Mum" text (suspicious)**
> I checked the message you forwarded.
> *Looks suspicious.*
> Why:
> 1. It says "Hi Mum, my phone broke, this is my new number". This is a common scam aimed at parents.
> 2. It asks you to pay a bill for them quickly.
> What to do: do not send money. Ring your son or daughter on the number you already have saved, or ask someone in the family who will know. Ask a question only the real person would know.
> I cannot see who sent it to you, so I could only read the words.
> Reply *2* for how to report it to the Gardai.
> Free service. We do not keep your message. We will never ask for money.

**C. Bank email forwarded as text, few red flags (cautious)**
> I checked the message you forwarded.
> *Some warning signs, but not many.*
> What I noticed:
> 1. It says "your account needs checking" and asks you to follow a link: "bank-secure-login[.]com".
> 2. That website name does not match your bank's real website.
> I did not find anything else, but that does not mean it is safe. Nobody can tell for certain from the words alone.
> What to do: do not use the link. Open your bank's app, or ring the number on the back of your card.
> Reply *3* to check another message.
> Free service. We do not keep your message.

### 8.3 Other ideas
- **"Send to a family member" (reply 1):** send back a prewritten, link-defused summary the person can forward as a normal chat message: "Hi, I got this message and the Scam Check said: ... Could you check with me?". Because it is a plain text message in the same chat, forwarding it needs the same two taps they already learned. (Reply option 1 is allowed because it is a reply inside the 24 h window.)
- **Follow-up menu using reply buttons (up to 3).** [V] send-messages page. Buttons: "Send to family", "How to report", "Check another". "How to report" returns Irish steps from the existing site (Garda, CCPC, bank) in text.
- **Link back to the website** for the long explanation (one short URL, the only clickable link). Add `?from=whatsapp` for analytics only if privacy-neutral [U].
- **Click-to-chat link on the website:** `https://wa.me/353XXXXXXXXX?text=...` opens WhatsApp with our number. This is WhatsApp's documented click-to-chat link format [U, confirm at https://faq.whatsapp.com/5913398998672934 ]. Pre-fill text: "Hello, I have a message to check." Button label: "Send a message to our WhatsApp".
- **QR code on the leaflet** pointing at the same wa.me link; with a printed "Add us once, save the number, then forward." box. Include the number in text beside the QR for people who can't scan. Keep the QR linking to a URL on our own domain that redirects to wa.me, so the target can change if the number changes (never print a QR straight to wa.me if you may change numbers). [U]
- **Contact card (vCard)** download to save the number with the right name in one tap [U].
- **Weekly "scam of the week"** broadcast: *do not do this*; requires templates, opt-in and costs money; it would also blur the "we never message first" promise.
- **Count of safe vs unsafe** no; "never says safe" stays.

## 9. Phased plan

### Phase 0: improve website flows (no server) - 1 to 3 days, EUR 0
- Move rules into `checker-core.js` (needed for every later phase) and add a Node test using the 106 practice messages.
- iPhone Shortcut ("Check for scams") that opens the page with the text after `#` (per PROJECT-NOTES).
- A "Send to someone you trust" button that's already there; add a printable how-to-forward page with the Android/iPhone steps (7.1) once tested on real phones.
- Rewrite the PROJECT-NOTES free-reply line; draft the privacy page text now.
- Dan must: test the steps on his own and a relative's phone.

### Phase 1: email forwarding - 2 to 4 days build, about EUR 10-20 a year plus maybe $5 a month
- Buy a domain; put it on Cloudflare DNS; enable Email Routing; deploy a Worker using `checker-core.js` and `postal-mime`; reply via `message.reply()`. Handle "forwarded as attachment" (parse the `message/rfc822` attachment and feed headers to the existing header checks). Rate-limit with Cloudflare's tools [U]. Privacy page and README update.
- Dan must: buy the domain, create the Cloudflare account, decide the email address (e.g. `check@...`), approve the privacy notice, test with Gmail, Outlook and Eir/Virgin addresses.
- Can be built by agent: Worker code, tests, reply formatter, privacy page draft.

### Phase 2: WhatsApp - 1 to 2 weeks build plus Meta lead time (unknown, allow 1 to 4 weeks), about EUR 0 to 5 a month at up to 1,000 checks
- Step 1 (Dan, first, before any coding): create Meta business portfolio and developer app, attempt business verification as a sole trader and see what Meta asks for; buy an Irish SIM; submit a display name. Decide whether to register a business name (CRO) first.
- Step 2 (built): Node service on the netcup VPS behind Caddy, webhook with signature check, text checks, image OCR, rate limits, content-free logs, fixed replies, reply buttons, kill switch. Test with the Meta test number, then the real number.
- Step 3: add the "AI Providers" clause check, DPA/DPC review, final privacy notice, leaflet QR, wa.me button, soft launch with 5 to 10 older users (as PROJECT-NOTES already suggests).
- Dan must: all Meta/Facebook account steps, 2FA, verification documents, SIM purchase and activation, payment method decision (no card = hard cap at 1,000 free replies), business-name registration if needed, DNS, VPS access, privacy notice sign-off, and checking Meta's current rate card (1.9).
- Monthly cost: SIM top-up about EUR 5 [U]; Meta $0 up to 1,000 replies; about $34 at 3,000; about $154 at 10,000 (+VAT).

### Phase 3: SMS - 1 to 2 weeks, cost uncertain
- Only after asking Irish providers for a number or 5-digit short code and a written quote. Twilio cannot give an Irish domestic long code or a short code [V], and replies cost about $0.08 each [V].
- Alternative: skip SMS and make "share from Messages to WhatsApp" the route.
- Dan must: contact providers, supply identity/address proof, pay setup and monthly fees, check ComReg short-code rules, and decide whether it is worth it.

### Recommended path
Phase 0 now; Phase 1 next (cheapest, no Meta dependency, proves the shared-rules module and privacy model); Phase 2 once verification outcome is known; Phase 3 probably never.

## 10. Items to verify before launch (checklist)
1. Meta rate card values for "Rest of Western Europe" (service $0.0171?) and VAT treatment.
2. Business verification route for an Irish sole trader; whether the Cloud API can run live without it.
3. Exact "AI Providers" clause and the EEA carve-out in https://www.facebook.com/legal/Meta-Terms-for-WhatsApp-Business-Platform .
4. Display-name rules and OBA eligibility.
5. Meta's retention of inbound messages and where Cloud API data is processed (US/EU); transfer mechanism.
6. Behaviour when the free tier is used up and no card is on file.
7. `context.forwarded` fields in a live test (send a forwarded message to the test number).
8. Cloudflare Worker CPU limit vs rules speed; DMARC pass of common Irish mail providers.
9. Irish SMS options and costs (Phase 3).
10. Steps for forwarding on current WhatsApp versions, tested on real phones.

## Source list
- Meta pricing: https://developers.facebook.com/docs/whatsapp/pricing
- Meta pricing updates (Oct 2026): https://developers.facebook.com/docs/whatsapp/pricing/updates-to-pricing
- Meta messaging limits: https://developers.facebook.com/docs/whatsapp/messaging-limits
- Meta phone numbers: https://developers.facebook.com/docs/whatsapp/cloud-api/phone-numbers
- Meta get started: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started
- Meta opt-in: https://developers.facebook.com/docs/whatsapp/overview/getting-opt-in
- Meta send messages: https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages
- Meta media: https://developers.facebook.com/documentation/business-messaging/whatsapp/business-phone-numbers/media
- Meta webhooks: https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages
- WhatsApp Business pricing page: https://whatsappbusiness.com/products/platform-pricing/
- AI policy coverage: https://techcrunch.com/2025/10/18/whatssapp-changes-its-terms-to-bar-general-purpose-chatbots-from-its-platform , https://respond.io/blog/whatsapp-general-purpose-chatbots-ban
- Twilio WhatsApp pricing: https://www.twilio.com/en-us/whatsapp/pricing ; Twilio forwarded flags: https://www.twilio.com/en-us/changelog/new-parameters-in-callbacks-for-inbound-whatsapp-messages
- Bird: https://bird.com/en-us/pricing/whatsapp ; 360dialog: https://360dialog.com/pricing , https://docs.360dialog.com/docs/resources/meta-business-verification.md , https://docs.360dialog.com/docs/waba-basics/architecture-and-security ; WATI: https://www.wati.io/pricing/
- Rate card copies: https://zernio.com/whatsapp-api-pricing , https://www.gupshup.ai/resources/wp-content/uploads/2025/10/USD_Oct2025.pdf , https://docs.gallabox.com/pricing-and-billing/whatsapp-pricing/rate-card.md
- Twilio Ireland SMS: https://www.twilio.com/en-us/guidelines/ie/sms , https://www.twilio.com/en-us/sms/pricing/ie
- ComReg: https://www.comreg.ie/sms-sender-id-registry/ , https://www.comreg.ie/senderid
- Cloudflare Email Workers: https://developers.cloudflare.com/email-routing/email-workers/ ; Postmark: https://postmarkapp.com/pricing ; SendGrid/Mailgun comparison: https://dreamlit.ai/blog/best-sendgrid-alternatives
- Data Processing Terms: https://whatsapp.com/legal/business-data-processing-terms?l=bg ; DPF appeal: https://www.wilmerhale.com/en/insights/blogs/wilmerhale-privacy-and-cybersecurity-law/20251201-european-court-of-justice-to-review-challenge-to-eu-us-data-privacy-framework ; DPC: https://dataprotection.ie/en/organisations
