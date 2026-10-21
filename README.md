# Is This a Scam?

A free, simple web page that helps people, especially older people, check whether an email or text message is a scam.

Paste the message in, watch it being checked, and get a clear answer with plain steps on what to do next.

## What it checks

- **Who sent it:** look-alike addresses, names that don't match the address, free email accounts pretending to be a company
- **Links:** links that go to a different website from the one they claim, disguised and shortened links, risky website endings, free hosting sites, websites on lists of known scams
- **Pressure:** urgency, threats, "your account is locked", fake fines and toll notices
- **What it asks for:** passwords, codes, bank details, personal details, gift cards, crypto, "safe account" transfers, changed bank details
- **Too good to be true:** prizes, grants, refunds, loans and investments with unrealistic returns
- **Hidden tricks:** invisible characters inside words, letters from other alphabets that look like ours
- **An email's hidden details (optional):** paste them in and it checks whether the email really came from the company it names, with simple steps for Gmail and Outlook
- **Common Irish scams:** parcel and customs fees, M50 toll texts, fake Gardaí, "Hi Mum" texts, booking.com and hotel messages
- **Safety net:** a message with a link, payment, code or reply request is never given a clean bill. If it would otherwise show no warning signs, the result warns you not to use the link or number in it, and to use the company's own app or a number you already have.

## Help beyond checking a message

- **Someone on the phone to you right now?** Tap "Yes, help me now" for a short checklist: hang up, ring back on a number you find yourself, and the things never to do for anyone.
- **A warning on your screen says you have a virus?** Tap "Help with a pop-up": don't ring the number, how to close it, and what to do if you already rang.
- **What they're probably after:** each warning result says in one line what the scammer wants, for example "a code sent to your phone".
- **Short results:** a one-line "Main warning signs", the two most useful tips, and every warning sign behind one button.
- **A helper you trust:** save a family member's name and number once (kept on your phone only), then send them a result on WhatsApp or by text in one tap.
- **How do I copy a message?** Step-by-step help for iPhone, Android, WhatsApp, email and screenshots.

## Using it on a phone

- **Paste in one tap:** copy the message, open the page, and tap "Paste and check".
- **Take a photo:** on a phone, tap "Take a photo of it" to photograph a message on another screen or a letter. The photo is read on your phone and nothing is uploaded.
- **Screenshots:** paste a screenshot straight into the box, or tap "Choose a screenshot" and pick the picture. The text is read on your phone; the picture is not uploaded anywhere.
- **Home screen:** add it to your home screen and it opens like an app, even without a connection.
- **Install help:** step-by-step instructions for Android Chrome and Samsung Internet. The app is called "Scam check" and has a teal shield icon.
- **Send the result to someone:** share it, email it, copy it, save it as a file, or print it, so a family member or friend can take a look too. Any links and email addresses in the shared copy are switched off, with the reason, so nobody opens them by mistake.
- **Share from WhatsApp or Messages (Android):** once it's on your home screen, press and hold a message, tap Share, and choose "Is This a Scam?". It opens and checks the message straight away. iPhones don't allow this for web pages, so use copy and paste there.

## Practise and report

- **Practise spotting scams:** a bank of 106 made-up messages (emails, texts and WhatsApp, easy to hard). Each round picks 8 you haven't seen yet. Guess "scam" or "genuine", then see the signs. A week after your last round, it offers a quick 3-message refresher, because what you learn fades without a little practice.
- **Answer a few questions:** a yes/no questionnaire, one question per screen, for texts, emails, phone calls and people at the door. Your answers stay on your phone.
- **How to report it:** clear steps for Ireland, based on advice from An Garda Síochána, the CCPC and gov.ie, with useful phone numbers (Garda Confidential, CCPC, Age Action) and a link to FraudSMART's ScamChecker for checking a website address.

## Privacy

The check runs entirely in your web browser. Nothing you paste is sent anywhere, unless you choose to report a scam we missed (see below). The page loads nothing from other websites: its fonts and the screenshot reader are part of this site. To show how much the tool is used, it counts each check, its result (scam, suspicious or no signs) and each quiz on our own server. Only that anonymous count is kept: never the message, your address or anything about you. Example messages and automated browsers are not counted. The home page shows the total as a chart once there are enough checks. If you choose to report a scam we missed, you can read and edit the text before you send it. It is kept for 30 days, with no address and no logs. When your message has a link, the page also checks the website against a list of known scam websites. It does this without telling us which website it checked: the page turns the website name into a scrambled code (a hash), then fetches only a small shared piece of the list chosen by the first two characters of that code, and compares the rest in your browser. The server never learns which website was checked. If the list can't be loaded within a second and a half, the check carries on without it. If you choose to copy the question into an AI tool such as ChatGPT, Copilot or Claude, that tool will see what you paste, so remove your name, address and account numbers first.

## Accessibility

Checked with the axe accessibility checker (no problems found), and every text colour meets the WCAG AA contrast standard. Text size buttons, a calm mode, read-aloud and screen-reader announcements are built in. Read-aloud picks an Irish or British English voice where the phone has one, and reads in short sentence chunks.

## Limits

- No checker can catch every scam, and this one can never prove a message is safe. That's why it never says "safe".
- Scams written with AI often have perfect spelling, so the page focuses on what a message asks you to do.
- It only checks messages written in English.
- If you are unsure, contact the company or person yourself, using a phone number or website you already know.

## If you have been scammed

Call your bank straight away, then report it at your local Garda station.

## Sources

Known scam websites come from [OpenPhish](https://openphish.com/) (free feed), [URLhaus](https://urlhaus.abuse.ch/) by abuse.ch (CC0) and [Phishing Army](https://phishing.army/) (CC BY-NC 4.0, non-commercial use with credit). `tools/scamlinks.py` rebuilds the list every 6 hours on the server, leaving out shared platforms such as Google, Microsoft and GitHub so genuine sites are not wrongly flagged.

## About

Built by Dan as part of a QQI Level 5 "Enhancing Productivity with AI" project, with help from Claude (Anthropic).

The tool is one page (`index.html`) plus an app icon, a home-screen settings file and a small offline helper. No tracking and no sign-up. The live site runs on our own server; GitHub keeps a backup copy.
