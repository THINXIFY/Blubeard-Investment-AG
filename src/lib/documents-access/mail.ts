import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/lib/site";

const DEFAULT_URL = "https://api.resend.com/emails";
const LOGO_CID = "blubeard-logo";

const IMPERIAL = "#1248d8";
const OBSIDIAN = "#101320";
const SLATE = "#4f5668";
const LINE = "#e2e5ec";
const PLATINUM = "#c5cbd6";
const PORCELAIN = "#f7f8fb";
const FONT = "Manrope,Inter,'Helvetica Neue',Helvetica,Arial,sans-serif";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export const isMailConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.DOCUMENTS_FROM_EMAIL);

/**
 * Local preview: while developing without a Resend key, nothing is emailed and no PDFs are needed;
 * the code is shown in the dialog so the flow can be reviewed. Never active in a production build.
 */
export const isPreviewMode = () => process.env.NODE_ENV === "development" && !process.env.RESEND_API_KEY;

type Outgoing = {
  to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: { filename: string; content: Buffer }[];
};

/** Sends through Resend's REST API (no SDK). The logo is embedded because inboxes block remote images. */
export async function sendMail({ to, subject, html, text, attachments = [] }: Outgoing) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.DOCUMENTS_FROM_EMAIL;
  if (!key || !from) throw new Error("mail_not_configured");

  const logo = await readFile(
    /*turbopackIgnore: true*/ path.join(process.cwd(), "public", "media", "branding", "logo-light.png"),
  );
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45_000);
  try {
    const res = await fetch(process.env.RESEND_API_URL || DEFAULT_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: site.email,
        subject,
        html,
        text,
        attachments: [
          { filename: "blubeard-logo.png", content: logo.toString("base64"), content_id: LOGO_CID },
          ...attachments.map((a) => ({ filename: a.filename, content: a.content.toString("base64") })),
        ],
      }),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`provider_${res.status}`);
  } finally {
    clearTimeout(timer);
  }
}

const { name, address, registry, email: companyEmail } = site;
const postalLine = `${address.street}, ${address.postalCode} ${address.locality}, ${address.country}`;

function shell(preheader: string, eyebrow: string, heading: string, body: string) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="color-scheme" content="light" /><title>${esc(heading)}</title></head>
<body style="margin:0;padding:0;background-color:${PORCELAIN};font-family:${FONT};">
<span style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;color:${PORCELAIN};">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${PORCELAIN};padding:32px 12px;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid ${PLATINUM};">
<tr><td style="height:3px;line-height:3px;font-size:3px;background-color:${IMPERIAL};">&nbsp;</td></tr>
<tr><td style="padding:32px 40px 24px;border-bottom:1px solid ${LINE};"><img src="cid:${LOGO_CID}" alt="${esc(name)}" width="184" style="display:block;border:0;width:184px;height:auto;" /></td></tr>
<tr><td style="padding:32px 40px 0;"><p style="margin:0;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${SLATE};">${esc(eyebrow)}</p>
<h1 style="margin:12px 0 0;font-size:28px;line-height:34px;font-weight:600;letter-spacing:-0.5px;color:${OBSIDIAN};">${esc(heading)}</h1></td></tr>
${body}
<tr><td style="padding:0 40px 32px;"><p style="margin:0;padding-top:20px;border-top:1px solid ${LINE};font-size:12px;line-height:18px;color:${SLATE};">${esc(name)} · ${esc(postalLine)}<br />UID ${esc(registry.uid)} · <a href="mailto:${esc(companyEmail)}" style="color:${IMPERIAL};text-decoration:none;">${esc(companyEmail)}</a></p></td></tr>
</table></td></tr></table></body></html>`;
}

export function renderOtpEmail(code: string, ttlMinutes: number) {
  const subject = `Your ${name} verification code`;
  const html = shell(
    `Use this code to request private documents from ${name}.`,
    "Private Documents · Verification",
    "Your verification code",
    `<tr><td style="padding:14px 40px 0;"><p style="margin:0;font-size:15px;line-height:24px;color:${SLATE};">Enter this six-digit code to confirm your email address and receive the documents you requested.</p></td></tr>
<tr><td style="padding:24px 40px 0;"><div style="padding:18px 8px;text-align:center;font-size:34px;line-height:40px;font-weight:bold;letter-spacing:10px;color:${OBSIDIAN};background-color:${PORCELAIN};border:1px solid ${PLATINUM};">${code}</div></td></tr>
<tr><td style="padding:24px 40px 28px;"><p style="margin:0;font-size:13px;line-height:20px;color:${SLATE};">The code expires in ${ttlMinutes} minutes. If you did not make this request, you can safely ignore this email; no documents are sent without the code.</p></td></tr>`,
  );
  const text = `${name} - Private Documents\n\nYour verification code: ${code}\n\nEnter this code to confirm your email address and receive the documents you requested. It expires in ${ttlMinutes} minutes.\nIf you did not make this request, ignore this email; no documents are sent without the code.\n\n${name}, ${postalLine}\n${companyEmail}`;
  return { subject, html, text };
}

export function renderDocumentsEmail(filenames: string[]) {
  const list = filenames
    .map(
      (f) =>
        `<tr><td style="padding:12px 0;border-bottom:1px solid ${LINE};font-size:14px;line-height:20px;font-weight:600;color:${OBSIDIAN};">${esc(f)}</td></tr>`,
    )
    .join("");
  const subject = `Your requested ${name} documents`;
  const notice =
    "These documents are provided for information and are intended for the recipient. They do not constitute an offer, personalised advice or a commitment of any kind.";
  const html = shell(
    `Your requested documents from ${name} are attached.`,
    "Private Documents · Delivered",
    "Your documents are attached",
    `<tr><td style="padding:14px 40px 0;"><p style="margin:0;font-size:15px;line-height:24px;color:${SLATE};">Thank you for verifying your email address. The documents you requested are attached to this message:</p></td></tr>
<tr><td style="padding:16px 40px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${LINE};">${list}</table></td></tr>
<tr><td style="padding:20px 40px 28px;"><p style="margin:0;font-size:13px;line-height:20px;color:${SLATE};">${notice} If you have questions, simply reply to this email.</p></td></tr>`,
  );
  const text = `${name} - Private Documents\n\nThank you for verifying your email address. The documents you requested are attached:\n\n${filenames.map((f) => `- ${f}`).join("\n")}\n\n${notice} Reply to this email with any questions.\n\n${name}, ${postalLine}\n${companyEmail}`;
  return { subject, html, text };
}
