import { clientIp, json, readJson } from "@/lib/documents-access/http";
import { isMailConfigured, isPreviewMode, renderOtpEmail, sendMail } from "@/lib/documents-access/mail";
import { generateOtp, hashOtp, otpConfig } from "@/lib/documents-access/otp";
import { getOtpStore } from "@/lib/documents-access/store";
import { rateLimit } from "@/lib/rate-limit";

const HOUR = 60 * 60 * 1000;

export async function POST(req: Request) {
  const parsed = await readJson(req);
  if ("error" in parsed) return parsed.error;
  const { requestId } = parsed.body;
  if (typeof requestId !== "string") return json({ error: "not_found" }, 404);

  const cfg = otpConfig();
  const preview = isPreviewMode();
  if (!cfg.secret || (!preview && !isMailConfigured())) return json({ error: "not_configured" }, 503);

  const ip = rateLimit(`docs-send-ip:${clientIp(req)}`, 20, HOUR);
  if (!ip.allowed) return json({ error: "rate_limited" }, 429, { "Retry-After": String(ip.retryAfterSec) });

  const store = getOtpStore();
  const challenge = await store.getById(requestId);
  if (!challenge || challenge.verified) return json({ error: "not_found" }, 404);

  if (!(await store.claimResend(requestId, cfg.resendCooldownMs))) return json({ error: "rate_limited" }, 429);

  const byEmail = rateLimit(`docs-send-email:${challenge.email}`, 5, HOUR);
  if (!byEmail.allowed) return json({ error: "rate_limited" }, 429, { "Retry-After": String(byEmail.retryAfterSec) });

  const code = generateOtp();
  const cooldownSeconds = Math.round(cfg.resendCooldownMs / 1000);
  if (!preview) {
    // Send first: if delivery fails, the previous code keeps working.
    try {
      await sendMail({ to: challenge.email, ...renderOtpEmail(code, cfg.ttlMinutes) });
    } catch {
      return json({ error: "mail_failure" }, 502);
    }
  }
  await store.replaceOtp(requestId, hashOtp(code, cfg.secret), cfg.ttlMinutes * 60_000);
  return json({ requestId, cooldownSeconds, ...(preview ? { previewCode: code } : {}) });
}
