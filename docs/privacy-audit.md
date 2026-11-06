# Technical privacy audit — Blubeard Investment AG website

Status: **draft for legal review** · Audit of the repository as of 5 November 2026 (IP-07).
Scope: everything that can be verified from the code. Hosting and operational facts are outside the repository and are listed as _to be confirmed_.

## Confirmed findings

| Area                                | Finding                                                                                                                                                                                                                                                                |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cookies                             | None set by the site. No cookie-setting code; no middleware/proxy. Next.js App Router sets no cookies by default.                                                                                                                                                      |
| Analytics / tracking                | None. No Google Analytics/Tag Manager, Plausible, Matomo, Hotjar, Clarity, Meta Pixel, Vercel Analytics/Speed Insights, Sentry or similar in code or dependencies.                                                                                                     |
| Browser storage                     | None. No `localStorage`, `sessionStorage` or IndexedDB use.                                                                                                                                                                                                            |
| Inline scripts                      | One first-party inline script adds a `js` class to `<html>` (progressive enhancement). JSON-LD structured data blocks contain only public company facts.                                                                                                               |
| Fonts                               | Manrope and Inter via `next/font/google`: downloaded at **build time** and served from the site's own domain. No runtime requests to Google Fonts.                                                                                                                     |
| Images & video                      | All self-hosted (`src/assets/images`, `public/media`). No remote image patterns configured.                                                                                                                                                                            |
| 3D / animation                      | three.js / React Three Fiber / GSAP bundled locally; 3D lighting generated in-browser (no remote HDR/asset requests).                                                                                                                                                  |
| Embeds                              | None (no iframes, embedded maps, YouTube/Vimeo, social widgets).                                                                                                                                                                                                       |
| Forms / data collection             | One form: Request Private Documents (email address, one-time code). See below. No accounts, newsletter or file uploads.                                                                                                                                                |
| Email                               | `mailto:info@blubeard-investment.com` links open the visitor's own mail client. "Copy email" uses the local clipboard API only — nothing is transmitted.                                                                                                               |
| External links (click-through only) | Google Maps directions (Contact), Moneyhouse company profile (Contact), Wikimedia Commons / Creative Commons (Image Credits). No data is sent until a visitor clicks.                                                                                                  |
| Third-party dependencies            | gsap, @gsap/react, three, @react-three/fiber, @react-three/drei, next, react, clsx, tailwind-merge — none make network calls at runtime.                                                                                                                               |
| Existing disclaimers                | Services page and service detail pages: "Descriptions … do not constitute an offer of regulated financial services." Our Approach: "does not constitute investment advice or an offer of financial services." No FINMA authorisation or exemption is claimed anywhere. |
| Indexing                            | Legal pages are `index, follow` and in the sitemap since client editorial approval (5 Nov 2026); legal review still outstanding — see `docs/legal-review-checklist.md`.                                                                                                |

## To be confirmed (outside the repository)

1. **Hosting provider and server location** (only `.env.example` exists; no platform configuration in the repo).
2. **Server/CDN access logs** — whether stored, fields, retention period, who has access.
3. **Platform-injected scripts or cookies** (e.g. hosting analytics, bot protection) — must be re-checked on the deployed site.
4. **HTTPS / TLS** configuration and security headers in production (security headers are set in `next.config.ts`).
5. **Email provider** for info@blubeard-investment.com, its data location, and retention of correspondence.
6. **International data transfers** resulting from 1 and 5.
7. **Data protection advisor**, and whether the site/services target the EU/EEA (GDPR applicability, EU representative).
8. **Regulatory status** under FinIA/FinSA (FINMA authorisation, supervisory organisation, client adviser registration) for the services described.
9. **VAT number**, board member function/signing authority, place of jurisdiction.
10. **Rights to client-supplied videos** (Real Estate Management, Logistics & Infrastructure) — see `docs/media-sources.md`.

## Re-audit triggers

Update the Privacy Policy and this audit before adding analytics, embedded maps or videos from external platforms, contact forms, newsletter tools, chat widgets, or a consent banner.

## Request Private Documents

Added 6 November 2026 and described in the Privacy Policy under "Private document requests".

- **Collected:** email address, entered voluntarily. IP address and email address are used for in-memory rate limits (up to one hour).
- **Stored:** `.data/otp-challenges.json` holds the email address and an HMAC hash of the code, deleted no later than one hour after the code expires. Cookies: none.
- **Shared with:** Resend (email delivery), once the API key is configured.
- **To confirm before launch:** Resend region, data processing agreement and log retention.
