# Deploying to the VPS

The site runs as one always-on Node.js process behind Nginx on a VPS shared with other projects. Do not use a serverless host or PM2 cluster mode: one-time codes are stored in a local file and rate limits in memory.

| Setting        | Value                                                             |
| -------------- | ----------------------------------------------------------------- |
| Server         | `2.25.169.72`                                                     |
| Live address   | `https://www.blubeard-investment.com` (the bare domain redirects) |
| App            | `127.0.0.1:4600`, reachable from outside only through Nginx       |
| PM2 process    | `blubeard-investment`                                             |
| Project folder | `/var/www/blubeard-investment`                                    |
| Private PDFs   | `/srv/blubeard-private/documents`                                 |
| Nginx site     | `/etc/nginx/sites-available/blubeard-investment`                  |

```
/var/www/blubeard-investment/
  deploy.sh             the command you run
  current -> releases/… the live release
  releases/             the live release and the two before it
  shared/.env.local     settings and secrets (linked into each release)
  shared/.data/         one-time codes (linked into each release)
  shared/logs/          app logs
  acme/                 Let's Encrypt validation files
```

Secrets and PDFs are never in Git. They exist only on the server.

## Initial setup

Run these as the user that owns the existing PM2 apps. Node.js 20.9 or newer, PM2, Nginx and Certbot must be installed. Check before installing anything: the server is shared, so do not change a system Node.js version other apps use.

1. **Get the setup files and inspect the server.** This step changes nothing, and stops on any conflict with port 4600, the PM2 name, the domain or the folder.

   ```bash
   git clone --depth 1 https://github.com/THINXIFY/Blubeard-Investment-AG.git /tmp/blubeard-setup
   bash /tmp/blubeard-setup/deploy/server-setup.sh check
   ```

2. **Create the folders and settings file.** The first run creates `shared/.env.local` with a new one-time-code secret, then stops and asks for the API key.

   ```bash
   bash /tmp/blubeard-setup/deploy/server-setup.sh install
   nano /var/www/blubeard-investment/shared/.env.local    # fill in RESEND_API_KEY
   ```

3. **Upload the private PDFs** from your computer, over the encrypted connection:

   ```bash
   scp private/documents/*.pdf <user>@2.25.169.72:/srv/blubeard-private/documents/
   ```

4. **Finish.** This builds the first release, adds the Nginx site, obtains the certificate, saves the PM2 list for reboots, confirms the other PM2 apps are unchanged, and verifies the live site.

   ```bash
   bash /tmp/blubeard-setup/deploy/server-setup.sh install
   ```

   If it prints a `pm2 startup` command to run, run it. Then remove the setup copy: `rm -rf /tmp/blubeard-setup`.

5. **Test by hand:** on `/contact`, click **Request Private Documents** and complete the flow with a real inbox. Confirm all the PDFs arrive and the email is not in spam. `blubeard-investment.com` must show **Verified** under Domains in Resend.

## Future updates

After the changes are on `main` in GitHub:

```bash
cd /var/www/blubeard-investment && ./deploy.sh
```

It fetches `main`, installs dependencies and builds in a new folder while the live site keeps running. It then switches over and restarts only this app, and checks the pages, CSS and images. If the checks fail, it restores the previous release automatically. A failed build never touches the live site.

Follow it with `./deploy.sh --verify` to check the public site: HTTPS, redirects, every sitemap page, that private paths return 404, and the documents configuration. It sends no email and prints no secrets.

If the GitHub repository is made private, the server needs a read-only deploy key before `./deploy.sh` can fetch it.

## Rollback

```bash
./deploy.sh --list        # * marks the live release
./deploy.sh --rollback    # back to the previous working release
```

The previous release restarts immediately, with no rebuild. A rollback covers code only. It does not change `shared/.env.local` or the PDFs.

## PM2

Always name the process. Never use `pm2 restart all`, `reload all`, `stop all`, `delete all` or `kill`: they affect every project on the server.

```bash
pm2 status blubeard-investment
pm2 restart blubeard-investment    # needed after changing .env.local or the PDFs
pm2 logs blubeard-investment
pm2 save                           # only after adding or removing a process
```

## Logs

| What         | Where                                                         |
| ------------ | ------------------------------------------------------------- |
| App          | `shared/logs/app.log`, `shared/logs/app-error.log`            |
| Nginx        | `/var/log/nginx/blubeard-investment.access.log`, `.error.log` |
| Certificates | `/var/log/letsencrypt/letsencrypt.log`                        |

PM2 does not rotate logs by itself. If the server has no `pm2-logrotate`, truncate them occasionally: `pm2 flush blubeard-investment`.

## Settings and documents

- `NEXT_PUBLIC_SITE_URL` is built into the pages, so a change needs `./deploy.sh`. Other settings need only `pm2 restart blubeard-investment`.
- To change the documents, add or remove PDFs in `/srv/blubeard-private/documents`, then restart. Every PDF in that folder is sent to anyone who verifies an email address, and the total must stay under 28 MB.
- Do not use Next.js `output: "standalone"`: the email logo is read from the project folder at run time.

## Nginx and certificates

Always validate first, and reload rather than restart:

```bash
sudo nginx -t && sudo systemctl reload nginx
sudo certbot certificates --cert-name blubeard-investment
sudo certbot renew --dry-run --cert-name blubeard-investment
```

Renewal is automatic through Certbot's timer, which also reloads Nginx afterwards. The certificate was issued with `--webroot`, so Certbot does not edit the Nginx file.

## Troubleshooting

- **Build killed or stalls:** the server ran out of memory. Check `free -h`. The live site is unaffected. Retry when the server is quieter.
- **502 from Nginx:** the app is down. Check `pm2 logs blubeard-investment` and that `ss -ltn | grep 4600` shows `127.0.0.1:4600`.
- **"Temporarily unavailable" in the documents dialog:** a value is missing from `shared/.env.local`, or the PDF folder is empty or unreadable. Restart after fixing it.
- **Code never arrives:** check `pm2 logs blubeard-investment` and the Emails and Domains pages in Resend.
- **403 from the document API:** Nginx is not forwarding the `Host` header.
- **"Another deployment is already running":** wait for it to finish. The lock releases itself when the script ends.
- **Sitemap shows localhost:** `NEXT_PUBLIC_SITE_URL` was missing at build time. Set it and run `./deploy.sh`.
