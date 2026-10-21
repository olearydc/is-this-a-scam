# Irish accuracy and currency check (21 Oct 2026)

Method: opened pages with WebFetch/curl where the site allowed it. AIB, PTSB, MABS, Citizens Information, gov.ie and Charities Regulator return 403 to bots. Items marked (search) are from official-domain search snippets, not a page I opened.

## (A) Claims and links on our page

| Text on our page | Status | Correct version / note | Source opened |
|---|---|---|---|
| Garda Confidential Line 1800 666 111 | OK | Confirmed. Note garda.ie says this is for confidential info on crime, not for reporting a scam you suffered. Consider relabelling. | garda.ie/en/crime/fraud/ |
| 999 or 112 emergency | OK | Confirmed on garda.ie | same |
| CCPC consumer helpline 01 402 5555 | OK | Confirmed (+353 1 402 5555; switchboard is 01 402 5500). Hours 9-6 Mon-Fri (search) | ccpc.ie/manage-your-money/scams-and-frauds/protecting-yourself-from-scams |
| Age Action 01 475 6989 | OK, with a caveat | Head office number, confirmed. It is not a scam helpline. Age Action's national line is 0818 911 109. | ageaction.ie/contact-us/ |
| "Report it at your local Garda station" | OK | Garda and CCPC pages say exactly this. Neither lists an online reporting option. | garda.ie fraud page; ccpc.ie |
| "Gardaí, banks and government departments will never ask for your PIN or password, or ask you to move your money" | OK | Garda page: "Gardaí and banks will never ask for your PIN or passwords, or ask you to transfer money." | garda.ie fraud |
| "An Post never texts a payment link" | OK (one nuance) | An Post: never sends a payment link by email or SMS. Only exception is USA-bound items via a US partner. Irish-bound customs charges: postcard, then pay on anpost.com or at a Post Office. | anpost.com/Security |
| "Revenue does not text customs charges" | OK | Revenue: "will never contact you looking for customs charges"; charges are paid to the courier, postal operator or agent. | revenue.ie/.../fraudulent-requests.aspx |
| "Check on the courier's own website or app" | OK | Matches Revenue advice. | same |
| Microsoft, Apple and phone company never put a phone number in such a warning | UNVERIFIABLE | Reasonable, no official page opened. Not harmful. | none |
| "Voices can now be copied by computer" | UNVERIFIABLE | Consistent with Garda and bank warnings, not checked on a source page. | none |
| "Fake delivery and customs-fee messages are the most common scam in Ireland" | UNVERIFIABLE | Overclaim risk. CCPC (Jun 2026) expected a spike after the 1 July customs change. Gardaí in Sept-Oct 2026 are stressing fake bank texts. Suggest "one of the most common". | ccpc.ie news 25 Jun 2026 |
| Charities Regulator register | UNVERIFIABLE (site 403) | Text names the register but gives no link. Real body. Add the link https://www.charitiesregulator.ie/ if desired. | curl 403 |
| "Irish government uses gov.ie", `.ie` addresses | OK in principle | Fine. The STATE list also includes `.gov.ie` subdomains. Caution that `.ie` alone does not prove safety. | none |
| Link: garda.ie/en/contact-us/station-directory/ | OK | HTTP 200 | curl |
| Link: garda.ie/en/crime/fraud/ | OK | HTTP 200 | curl |
| Link: ccpc.ie/consumers/money/scams/scams-what-to-watch-out-for/ | OUTDATED | 200 only via redirect to ccpc.ie/manage-your-money/scams-and-frauds/protecting-yourself-from-scams. Update to the new URL. | curl -L |
| Link: gov.ie ".../alert-on-scam-phone-calls-and-text-messages/" | UNVERIFIABLE | 403 to curl (bot block). Check it in a browser. | curl 403 |
| Link: fraudsmart.scamchecker.ie | OK | 200. Page says "SCAMCHECKER.IE, Check if a website or link is legit". FraudSMART (BPFI) site calls it a new service. "run by Irish banks" is fair (BPFI is the banking federation). | opened |
| Link: https://olearydc.github.io/is-this-a-scam/ (SITE constant, added to every shared or printed result) | WRONG | HTTP 404. Shared messages carry a dead link. Use https://isthisascam.selfdestruct.online/. | curl 404 |
| Live site https://isthisascam.selfdestruct.online/ | OK | 200 | curl |
| leaflet.html: "Lost money? Call your bank straight away, then your local Garda station" | OK | | |
| leaflet.html: isthisascam.selfdestruct.online | OK | | |
| 1800 000 000 in the Microsoft sample | n/a | Fake sample number, fine. Sample domains are obviously fake. Check none are real, for example `eflow-ie-toll.info`. | none |
| Sample "customs charge of €3.90" (An Post email) | OK as scam sample | Official charge is €3 per unique item from 1 July 2026 (CCPC). No claim is made on the page. | ccpc.ie news |
| External links chatgpt.com, claude.ai/new, copilot.microsoft.com, wa.me | OK (not checked in detail) | Standard. | none |

No page text states the €3 customs charge or ComReg, so there is nothing to correct there.

## (B) Recommended additions (verified)

**Bank fraud lines (Republic of Ireland)**
- Bank of Ireland: freephone 1800 946 764, 24/7, fraud and lost or stolen cards. Suspicious messages: 365security@boi.com. Opened: bankofireland.com/help-centre/contact-us/
- AIB: 1800 24 22 27 (+353 1 771 5639 from abroad), 24/7, fraud and lost cards. (search) aib.ie/security-centre/support-available-to-report-fraud. Page is bot-blocked, so check it in a browser before publishing.
- PTSB: fraud +353 1 669 5851, 24/7; lost or stolen cards 1800 687 687 (+353 1 212 4290 abroad), 24/7. (search) ptsb.ie/contact-us/emergency-contacts/. Page is bot-blocked, so check it in a browser before publishing.
- An Post Money: lost or stolen current account card 1800 267 678, 24/7 (+44 115 965 9218 abroad); credit card 1800 800 780 (hours not stated). Opened: anpost.com/Money/Help-Support/Contact and anpost.com/Security
- Revolut: no phone line found. In the app, go to Cards, then Freeze, then Home, the transaction, then Get help. Gardaí (Donegal) warn Revolut never phones out of the blue. (search) help.revolut.com.
- Credit unions: no single national number found. Say "the number on your card or statement".
- Safest wording for our page: keep "number on the back of your card" as the main advice. If adding numbers, list only BoI, AIB, PTSB, An Post Money and tell users to re-check on the bank's own site. Scammers spoof numbers, and Gardaí warned about a lookalike 0-1800-666-111.

**Support lines**
- Crime Victims Helpline: freephone 116 006, text 085 133 7711. Mon-Thu 10:00-19:30, Fri 10:00-17:00, Sat and bank holidays 14:00-16:00, closed Sunday. Opened: crimevictimshelpline.ie
- Samaritans: 116 123, free, 24/7. Opened: samaritans.org/ireland/
- ALONE support line for older people: 0818 222 024, 8am-8pm, 7 days. Opened: alone.ie (a search listing had conflicting older hours).
- Senior Line (Age Action): 1800 804 591, free, 10am-10pm daily. (search only; the ageaction.ie page I tried 404'd). Confirm before publishing.
- MABS (debt): 0818 07 2000, Mon-Fri 9am-8pm. (search, from mabs.ie/contact snippet; mabs.ie itself returned 403). Older leaflets show 0761 07 2000, which is out of date. Confirm before publishing.
- Age Action national line 0818 911 109 (Care & Repair and getting-started help). Opened: ageaction.ie/contact-us/

**Other**
- Central Bank of Ireland: warning list of unauthorised firms, plus the Register, at centralbank.ie. Phone (01) 224 4000 (search). The two Central Bank pages I tried returned 404 or were not opened, so locate the exact URL by browsing from centralbank.ie. The home page returns 200. Useful for fake investment and crypto scams.
- Reporting scam texts to the operator: no verified Irish short code found. 7726 is UK-only. Vodafone Ireland has a spam-forwarding service (number not retrieved; page redirects). Eir only says to report to Gardaí (eir.ie/online-safety). Three Ireland: nothing found. Do NOT publish a short code. Instead: "Tell your phone company using its website."
- Garda online reporting: garda.ie fraud page and CCPC page list none. Keep "local Garda station".
- ComReg: has a Sender ID Registry (Jun 2025) and a "Likely Scam" text label (since 3 Jul 2025) (search). The consumer page I tried 404'd. Possible line: "A text labelled 'Likely Scam' is one to delete."
- An Post: contact via Contact Us, Facebook messenger or @Postvox with a screenshot. Phone Mon-Fri 9-5:30, Sat 9-2. Opened: anpost.com/Security

**Suggested wording fixes**
1. Replace SITE with https://isthisascam.selfdestruct.online/.
2. Update the ccpc.ie link.
3. Temper "most common scam in Ireland".
4. Add "if you are upset or frightened: Samaritans 116 123, Crime Victims Helpline 116 006".

## (C) Trends, Sept-Oct 2026

- 22 Sep 2026 (Connacht Tribune, search): Gardaí warn of fake bank texts about an outstanding payment, pushing the victim to phone a number. Seven known victims lost about €150,000 in one week, including one loss of €75,000. Monaghan Gardaí repeated the warning on 21 Oct. Victims are told to open a crypto wallet or account on someone else's instruction. This fits our "bank text plus phone number" and "safe account" patterns. Add: "Never open a crypto account because someone told you to."
- 15 Oct 2026 (garda.ie statement, search): Garda X accounts @gardainfo and @gardatraffic were hacked and posted fake crypto "XRP allocation" offers. Do not click anything on them. Garda page: garda.ie/.../2026/october/15-10-2026-statement-an-garda-siochana-x-accounts.html
- 10 Oct 2026 (Highland Radio, search): Donegal Gardaí say AI is making phishing emails more realistic. Good grammar no longer proves an email is genuine. Check the page's "good English means safe" logic if present.
- FraudSMART (opened, 21 Oct 2026): over €7m laundered through money mule accounts in the 12 months to June 2026; 14 Sep 2026: most people get suspicious contacts monthly and over half say they are rising; 4 Sep 2026: "27% jump in losses" (headline only; not independently confirmed).
- Customs scams: new customs rules from 1 July 2026 (non-EU parcels at or under €150 now charged; €3 per unique item) triggered a CCPC and Bank of Ireland warning about fake customs texts (Jun 2026). Genuine charges are paid to the courier, postal operator or agent (Revenue). An Post: postcard, then pay on anpost.com or at a Post Office. Our existing "An Post / Revenue" rules are correct and current. Consider adding a rule for "customs charge" texts that name a fee of about €3.
- Telecom side: Three Ireland says it blocked over 26m scam calls in 2025; ComReg labels unregistered sender IDs "Likely Scam" (Jun 2026 Irish Times, search).
- Impersonation: Revolut callers (Donegal Gardaí) and "Three" staff offering upgrades (Offaly Gardaí). Both fit the existing "someone phones you" help page.
