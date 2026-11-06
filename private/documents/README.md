# Documents emailed on request

This is the default folder for local development. PDFs here are attached to the "Request Private Documents" email sent to anyone who verifies an email address.

- **Every** PDF here is attached, so keep only files approved for that audience.
- Only `.pdf` files are used; hidden files, other types and sub-folders are ignored.
- The folder is outside `public/`, so the website never serves these files directly.
- The total size must stay under 28 MB.
- While the folder is empty, production shows "temporarily unavailable" and sends no codes.
- PDFs are ignored by Git and must never be committed. On a server, keep them outside the project and set `DOCUMENTS_DIR` (see `docs/deploy-vps.md`).
