# Deploying to a VPS

The site runs as one always-on Node.js process behind Nginx. Do not use a serverless host: one-time codes are stored in a local file and rate limits in memory.

## What travels with Git, and what does not

| Item                           | In Git?       | On the VPS                    |
| ------------------------------ | ------------- | ----------------------------- |
| Website code and `public/`     | Yes           | Arrives with `git clone`      |
| Private PDFs                   | **No, never** | Copy them separately (step 4) |
| `.env.local` (API key, secret) | **No, never** | Create it by hand (step 3)    |
| `.data/` (one-time codes)      | No            | Created automatically         |

## Steps

1. **Server:** install Node.js 22 LTS (20.9 or newer works), Nginx, PM2 (`npm i -g pm2`) and Certbot.
2. **Code:** `git clone https://github.com/THINXIFY/Blubeard-Investment-AG.git /var/www/blubeard && cd /var/www/blubeard`
3. **Settings:** create `.env.local` in the project root, then run `chmod 600 .env.local`:

   ```
   NEXT_PUBLIC_SITE_URL=https://www.blubeard-investment.com
   RESEND_API_KEY=re_...
   DOCUMENTS_FROM_EMAIL="Blubeard Investment AG <info@blubeard-investment.com>"
   OTP_HASH_SECRET=<new value>
   DOCUMENTS_DIR=/srv/blubeard-private/documents
   ```

   Generate the secret with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. `NEXT_PUBLIC_SITE_URL` is built into the pages, so it must be set **before** the build, and a change needs a rebuild.

4. **Private PDFs:** create a folder outside the project that only the app's user can read, then copy the files over an encrypted connection from your computer:

   ```bash
   # On the VPS (replace appuser with the user running PM2)
   sudo install -d -m 700 -o appuser -g appuser /srv/blubeard-private /srv/blubeard-private/documents

   # On your computer
   scp private/documents/*.pdf appuser@<server>:/srv/blubeard-private/documents/

   # On the VPS
   chmod 600 /srv/blubeard-private/documents/*.pdf
   ```

   Do not put them in `public/`, in Git, or in a folder Nginx serves.

5. **Build:** `npm ci && npm run build`
6. **Start:** `pm2 start deploy/ecosystem.config.cjs && pm2 save && pm2 startup`
7. **Nginx:** copy `deploy/nginx-blubeard.conf.example` to `/etc/nginx/sites-available/blubeard`, enable it, reload Nginx, then run `certbot --nginx`.
8. **Permissions:** the user running PM2 must be able to write to the project folder, because `.data/` is created there.

Run the app from the project root and do not use Next.js `output: "standalone"`: the email logo is read from the project folder at run time.

## Resend

`blubeard-investment.com` must show **Verified** under Domains in Resend (SPF and DKIM records at the DNS provider). Otherwise every email is rejected. The same API key works locally and on the VPS.

## Check after going live

1. Open `/contact`, click **Request Private Documents**, and complete the flow with a real inbox.
2. Confirm all PDFs arrive and the email is not in spam.
3. Confirm `https://<domain>/private/documents/` returns 404 and `/sitemap.xml` shows the real domain.

## Updating

`git pull && npm ci && npm run build && pm2 restart blubeard`

To change the documents, add or remove PDFs in the `DOCUMENTS_DIR` folder, then run `pm2 restart blubeard`. No Git change or rebuild is involved. Every PDF in that folder is sent to anyone who verifies an email address, and the total must stay under 28 MB.

## Troubleshooting

- **"Temporarily unavailable" in the dialog:** a setting is missing from `.env.local`, or the `DOCUMENTS_DIR` folder is empty or unreadable by the app's user. Restart PM2 after changing `.env.local`.
- **Code never arrives:** check `pm2 logs blubeard` and the Resend dashboard's Emails and Domains pages.
- **403 from the document API:** Nginx is not forwarding the `Host` header.
