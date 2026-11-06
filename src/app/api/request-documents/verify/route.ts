import { loadDocuments } from "@/lib/documents-access/documents";
import { clientIp, json, readJson } from "@/lib/documents-access/http";
import { isMailConfigured, isPreviewMode, renderDocumentsEmail, sendMail } from "@/lib/documents-access/mail";
import { otpConfig, verifyOtp } from "@/lib/documents-access/otp";
import { getOtpStore, type OtpChallenge } from "@/lib/documents-access/store";
import { rateLimit } from "@/lib/rate-limit";

/** Delivers the documents once: a sent challenge is never re-sent and a delivery in progress is not duplicated. */
async function deliver(challenge: OtpChallenge, preview: boolean) {
  const store = getOtpStore();
  const claim = await store.claimDelivery(challenge.id);
  if (claim !== "claimed") return claim;
  try {
    if (!preview) {
      const docs = await loadDocuments();
      await sendMail({
        to: challenge.email,
        ...renderDocumentsEmail(docs.map((d) => d.filename)),
        attachments: docs,
      });
    }
    await store.finishDelivery(challenge.id, "sent");
    return "sent";
  } catch {
    await store.finishDelivery(challenge.id, "failed");
    return "failed";
  }
}

export async function POST(req: Request) {
  const parsed = await readJson(req);
  if ("error" in parsed) return parsed.error;
  const { requestId, code } = parsed.body;
  if (typeof requestId !== "string" || typeof code !== "string") return json({ error: "not_found" }, 400);

  const cfg = otpConfig();
  const preview = isPreviewMode();
  if (!cfg.secret || (!preview && !isMailConfigured())) return json({ error: "not_configured" }, 503);

  const ip = rateLimit(`docs-verify-ip:${clientIp(req)}`, 30, 60 * 60 * 1000);
  if (!ip.allowed) return json({ error: "rate_limited" }, 429, { "Retry-After": String(ip.retryAfterSec) });

  const store = getOtpStore();
  const challenge = await store.getById(requestId);
  if (!challenge) return json({ error: "not_found" }, 400);

  const respond = (status: Awaited<ReturnType<typeof deliver>>) =>
    status === "in_progress" ? json({ error: "in_progress" }, 409) : json({ status, preview });

  // Already verified: retry delivery without the code (supports "Try again"); only ever goes to the verified address.
  if (challenge.verified) return respond(await deliver(challenge, preview));

  if (Date.now() > challenge.expiresAt) return json({ error: "expired" }, 400);

  // Count the attempt before comparing, so parallel guesses cannot exceed the limit.
  const { attemptCount } = await store.incrementAttempts(challenge.id);
  const correct = /^\d{6}$/.test(code) && verifyOtp(code, challenge.otpHash, cfg.secret);
  if (attemptCount > cfg.maxAttempts || (!correct && attemptCount >= cfg.maxAttempts)) {
    await store.invalidate(challenge.id);
    return json({ error: "too_many_attempts" }, 400);
  }
  if (!correct) return json({ error: "invalid_code", attemptsLeft: cfg.maxAttempts - attemptCount }, 400);

  return respond(await deliver(await store.markVerified(challenge.id), preview));
}
