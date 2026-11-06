# Blubeard Investment AG

Corporate website and private-document platform for Blubeard Investment AG, a Swiss investment company based in Samedan, Graubünden.

The site presents the company, its investment sectors and its services. It also lets visitors verify an email address and receive the company's private documents by email.

## Technology

| Area        | Stack                                                |
| ----------- | ---------------------------------------------------- |
| Framework   | Next.js 16 (App Router), React 19                    |
| Language    | TypeScript                                           |
| Styling     | Tailwind CSS 4                                       |
| Motion / 3D | GSAP with ScrollTrigger, React Three Fiber, Three.js |
| Email       | Resend REST API                                      |
| Quality     | ESLint, Prettier                                     |
| Hosting     | Single Node.js process with PM2, behind Nginx        |

## Pages

| Route                                 | Content                                                      |
| ------------------------------------- | ------------------------------------------------------------ |
| `/`                                   | Home, including the interactive four-stage approach selector |
| `/about`                              | Company, values, headquarters and leadership                 |
| `/investments`                        | Investment overview and sector directory                     |
| `/investments/[slug]`                 | 12 sector pages                                              |
| `/services`                           | Services overview                                            |
| `/services/[slug]`                    | 8 service pages                                              |
| `/approach`                           | Investment principles and process                            |
| `/team`                               | Leadership and management team                               |
| `/partners`                           | Partner philosophy and logo marquee                          |
| `/contact`                            | Contact details, headquarters and document requests          |
| `/legal-notice`, `/privacy`, `/terms` | Impressum, Privacy Policy and Terms of Use                   |
| `/image-credits`                      | Photography licences and attribution                         |

The site also provides metadata, Open Graph images, structured data, a sitemap and `robots.txt`. Layouts are responsive, and animations respect `prefers-reduced-motion`.

## Private-document requests

**Request Private Documents** appears on the Contact and About pages:

1. The visitor enters an email address and receives a six-digit code.
2. The visitor enters the code in the dialog.
3. Once the code is verified, every PDF in the documents folder is emailed to that address.

Safeguards in `src/lib/documents-access` and `src/app/api/request-documents`:

- Codes are stored only as HMAC hashes, and they expire and allow a limited number of attempts.
- Requests are rate limited per email address and per client IP, with a resend cooldown.
- API routes accept only same-origin JSON requests with a size limit, and include a honeypot field.
- PDFs are read on the server from outside `public/`, so the website never serves them directly.

Verification proves control of an inbox, not a person's identity. Only keep documents in the folder that may go to anyone who verifies an address.

**The PDFs are not in this repository.** See [Private documents](#private-documents).

## Getting started

Requires Node.js 20.9 or newer (22 LTS recommended).

```bash
npm ci
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open <http://localhost:3000>. Without `RESEND_API_KEY`, development shows the one-time code on screen and sends no email.

| Script           | Purpose                                |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Start the development server           |
| `npm run build`  | Create the production build            |
| `npm start`      | Serve the production build             |
| `npm run check`  | TypeScript, ESLint and Prettier checks |
| `npm run format` | Format the project with Prettier       |

## Environment variables

Set these in `.env.local`, which Git ignores. `.env.example` lists them without secrets.

| Variable                      | Required     | Purpose                                                              |
| ----------------------------- | ------------ | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | Production   | Public URL for canonical links and the sitemap. Set before building. |
| `RESEND_API_KEY`              | Production   | Resend API key                                                       |
| `DOCUMENTS_FROM_EMAIL`        | Production   | Sender address on a Resend-verified domain                           |
| `OTP_HASH_SECRET`             | Production   | Secret for hashing one-time codes (32+ random characters)            |
| `DOCUMENTS_DIR`               | Production   | Absolute path to the folder holding the private PDFs                 |
| `OTP_TTL_MINUTES`             | Optional     | Code lifetime                                                        |
| `OTP_MAX_ATTEMPTS`            | Optional     | Attempts allowed per code                                            |
| `OTP_RESEND_COOLDOWN_SECONDS` | Optional     | Wait between code emails                                             |
| `OTP_STORE_PATH`              | Optional     | Location of the one-time code store file                             |
| `RESEND_API_URL`              | Testing only | Overrides the email provider endpoint                                |

## Private documents

Git ignores all PDFs. Provide them separately in one of two ways:

- **VPS:** a folder outside the project, set with `DOCUMENTS_DIR`.
- **Local development:** `private/documents/`, the default location when `DOCUMENTS_DIR` is not set.

While no PDFs are available, production shows "temporarily unavailable" and sends no codes. The total size must stay under 28 MB.

## Production build

```bash
npm ci
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` before building, because it is compiled into the pages.

## Deployment

The site runs as one persistent Node.js process under PM2, behind Nginx with HTTPS. Do not use serverless hosting or PM2 cluster mode: one-time codes are stored in a local file and rate limits in memory.

Full steps, including how to transfer the PDFs securely, are in [docs/deploy-vps.md](docs/deploy-vps.md). The process and proxy configuration is in [deploy/](deploy/).

## Project structure

```text
src/app/          Routes, API handlers, metadata and global styles
src/components/   Page sections and shared UI
src/content/      Page copy, partner list, image registry and credits
src/lib/          Site data, motion helpers, rate limiting and document access
src/assets/       Photography processed by Next.js
public/           Logos, videos and other static files
private/          Local location for private documents (PDFs are ignored by Git)
deploy/           PM2 and Nginx configuration
docs/             Deployment, legal review, privacy and media notes
```

## Content and rights

Photography is credited on the Image Credits page and in `src/content/image-credits.json`. Partner logos and company content belong to their respective owners. This is a proprietary project, and no licence to reuse it is granted.
