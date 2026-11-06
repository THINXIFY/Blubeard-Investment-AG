# Documents emailed on request

This is the default folder for local development. PDFs here are attached to the "Request Private Documents" email sent to anyone who verifies an email address.

- **Every** PDF here is attached, so keep only files approved for that audience.
- Only `.pdf` files are used; hidden files, other types and sub-folders are ignored.
- The folder is outside `public/`, so the website never serves these files directly.
- The total size must stay under 28 MB.
- While the folder is empty, production shows "temporarily unavailable" and sends no codes.
- PDFs here are committed to the repository, which is public, so anyone can download them from GitHub. On a server, the app reads its own copy through `DOCUMENTS_DIR` (see `docs/deploy-vps.md`).
