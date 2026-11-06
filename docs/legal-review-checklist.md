# Legal review checklist

## Approval record

| Approval                           | Status          | Date            | Scope                                                                                                                                                                                       |
| ---------------------------------- | --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Client editorial approval**      | ✅ Given        | 5 November 2026 | Design and content of Impressum, Privacy Policy and Terms of Use approved for publication (IP-07 FINAL). Pages set to `index, follow` and added to the sitemap on the client’s instruction. |
| **Legal approval (Swiss counsel)** | ❌ Not obtained | —               | No counsel review has taken place. Do not describe the documents as legally reviewed or approved.                                                                                           |
| **Regulatory confirmation**        | ❌ Not obtained | —               | Regulatory status (FinIA/FinSA, FINMA, supervisory organisation, client-adviser registration) unverified. No authorisation or exemption is claimed on the site.                             |

Client editorial approval does **not** resolve the legal items below. They remain open and the related statements must not be treated as verified.

## Publication blockers — resolve before public deployment

1. **Production domain** — `NEXT_PUBLIC_SITE_URL` is not set. Without it, canonical URLs, Open Graph URLs and the sitemap point to `http://localhost:3000`. Every production build prints a warning until it is set.
2. **Recipients and transfers (Privacy Policy)** — the FADP requires disclosure of recipients (or categories) and of the countries to which personal data is transferred. The policy currently names only generic categories (“hosting and email providers”); actual providers and countries must be added once hosting and email are confirmed (items under _Website access and server logs_, _Email communication_, _Recipients and international transfers_).
3. **Regulatory status** — confirm before publication whether any described activity requires FINMA authorisation, affiliation with a supervisory organisation or client-adviser registration, and add the applicable statement (Terms › Regulatory information).
4. **“Investment company” wording** — the site now describes the company as a “Swiss investment company” (client-approved positioning). In Swiss collective-investment law (CISA) “investment company” (SICAF/SICAV) is a defined term; counsel should confirm the wording is not misleading for an AG of this kind, or adjust it (e.g. “Swiss investment firm”).
5. **Rights to client-supplied videos** — Real Estate Management and Logistics & Infrastructure heroes (author and licence unknown; `docs/media-sources.md`).
6. **Post-deployment re-audit** — confirm the hosting platform adds no cookies, analytics or scripts; otherwise the Privacy Policy statement on cookies must be updated before go-live.

Not to be claimed anywhere until verified: FINMA authorisation or exemption, GDPR compliance, legal approval by counsel. Registered share capital stays excluded.

## Release conditions

- [ ] Formal approval of all three pages by Swiss legal counsel
- [ ] All 12 review items below resolved and the page text updated where needed
- [x] Pages set to `index, follow` and added to the sitemap — done on client instruction (5 November 2026), ahead of legal review
- [ ] `NEXT_PUBLIC_SITE_URL` set to the production domain
- [ ] Re-audit of the deployed site (hosting-injected scripts/cookies) — see `docs/privacy-audit.md`

## Open review items (12)

These notes appeared on the drafts as “To be confirmed” and are no longer displayed publicly. They are kept as `review` entries in `src/content/legal.ts` (source of this list).

## Impressum (`/legal-notice`)

- [ ] **Commercial register** — Confirm the board member’s registered function and signing authority, and whether a VAT number (MWST) applies and should be listed.
- [ ] **Copyright and image rights** — Confirm the commercial-use rights for the client-supplied videos on the Real Estate Management and Logistics & Infrastructure pages (author and licence currently unknown).

## Privacy Policy (`/privacy`)

- [ ] **Controller and contact** — Confirm whether a data protection advisor has been appointed, and whether the website or services are directed at persons in the EU/EEA (which may require GDPR provisions and an EU representative).
- [ ] **Website access and server logs** — Hosting provider, server location, whether access logs are stored, their contents and retention period are not yet determined. Add these details once hosting is confirmed.
- [ ] **Email communication** — Confirm the email service provider (and its data location) and the retention period for business correspondence.
- [ ] **Cookies, analytics and tracking** — This reflects the website’s code as of the draft date. Update this section before adding analytics, embedded maps, videos from external platforms or any other third-party service, and if the hosting platform adds its own cookies or analytics.
- [ ] **Recipients and international transfers** — List the actual providers and the countries where data is processed once hosting and email services are confirmed.
- [ ] **Retention** — Specify retention periods for server logs and email correspondence.
- [ ] **Data security** — Confirm that the website will be served exclusively over HTTPS and describe any further measures applicable to hosting and email.

## Terms of Use & Disclaimer (`/terms`)

- [ ] **Regulatory information** — Confirm Blubeard Investment AG’s regulatory status in relation to the services described (e.g. whether any activity requires FINMA authorisation, supervision by a supervisory organisation, or registration as a client adviser under FinSA). Add the applicable statement once verified. No authorisation or exemption is stated on this website until confirmed.
- [ ] **Accuracy of information** — Counsel to confirm the wording of the liability limitation under Swiss law (liability for intent and gross negligence cannot be excluded).
- [ ] **Applicable law and jurisdiction** — Confirm the place of jurisdiction (e.g. the competent court at the company’s registered office in Samedan) and any mandatory consumer provisions.

## Related

- Technical findings: `docs/privacy-audit.md`
- Media rights: `docs/media-sources.md`
