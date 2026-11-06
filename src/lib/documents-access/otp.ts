import { createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";

/** Cryptographically secure six-digit code. */
export function generateOtp(): string {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

/**
 * A six-digit code has only 1,000,000 possible values, so it is HMAC'd with a server secret before
 * storage; a plain hash of such a small keyspace could be reversed in seconds.
 */
export function hashOtp(code: string, secret: string): string {
  return createHmac("sha256", secret).update(code).digest("hex");
}

export function verifyOtp(code: string, hash: string, secret: string): boolean {
  const candidate = Buffer.from(hashOtp(code, secret), "hex");
  const stored = Buffer.from(hash, "hex");
  return candidate.length === stored.length && timingSafeEqual(candidate, stored);
}

const int = (v: string | undefined, fallback: number, min: number, max: number) => {
  const n = Number(v);
  return v && Number.isInteger(n) && n >= min && n <= max ? n : fallback;
};

// Development convenience only: a per-process secret. Production must set OTP_HASH_SECRET.
const devSecret = randomBytes(32).toString("hex");

export function otpConfig() {
  const configured = process.env.OTP_HASH_SECRET?.trim();
  const secret =
    configured && configured.length >= 16 ? configured : process.env.NODE_ENV === "production" ? null : devSecret;
  return {
    secret,
    ttlMinutes: int(process.env.OTP_TTL_MINUTES, 10, 1, 60),
    maxAttempts: int(process.env.OTP_MAX_ATTEMPTS, 5, 1, 10),
    resendCooldownMs: int(process.env.OTP_RESEND_COOLDOWN_SECONDS, 60, 0, 600) * 1000,
  };
}
