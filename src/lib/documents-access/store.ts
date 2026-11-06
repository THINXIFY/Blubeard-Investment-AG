import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

type DeliveryStatus = "pending" | "sending" | "sent" | "failed";

export type OtpChallenge = {
  id: string;
  email: string;
  otpHash: string;
  expiresAt: number;
  attemptCount: number;
  lastSentAt: number;
  verified: boolean;
  deliveryStatus: DeliveryStatus;
  sendingSince: number | null;
};

// Expired challenges are kept briefly so a code can be re-sent and a failed delivery retried, then pruned.
const EXPIRED_RETENTION_MS = 60 * 60 * 1000;
// A delivery still "sending" after this long died with its process and may be claimed again.
const STALE_SENDING_MS = 2 * 60 * 1000;

/**
 * File-backed challenge store for a single running Node process. Only the code's hash is stored.
 * Mutations run without an `await` between read and write; file writes are serialised and atomic.
 * Multi-instance or serverless hosting needs a shared store (Redis, a database) behind these methods.
 */
class FileOtpStore {
  private cache: Map<string, OtpChallenge> | null = null;
  private queue: Promise<void> = Promise.resolve();

  constructor(private readonly filePath: string) {}

  private async load() {
    if (this.cache) return this.cache;
    let entries: OtpChallenge[] = [];
    try {
      entries = JSON.parse(await readFile(/*turbopackIgnore: true*/ this.filePath, "utf8")) as OtpChallenge[];
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
    }
    this.cache ??= new Map(entries.map((e) => [e.id, e]));
    return this.cache;
  }

  private async persist() {
    const map = await this.load();
    const now = Date.now();
    for (const [id, c] of map) if (c.expiresAt + EXPIRED_RETENTION_MS < now) map.delete(id);
    const data = JSON.stringify([...map.values()]);
    const tmp = `${this.filePath}.${process.pid}.${now}.${randomBytes(4).toString("hex")}.tmp`;
    const attempt = this.queue
      .catch(() => {})
      .then(async () => {
        await mkdir(/*turbopackIgnore: true*/ path.dirname(this.filePath), { recursive: true });
        await writeFile(/*turbopackIgnore: true*/ tmp, data, "utf8");
        await rename(/*turbopackIgnore: true*/ tmp, /*turbopackIgnore: true*/ this.filePath);
      });
    this.queue = attempt.catch(() => {});
    await attempt;
  }

  async create(email: string, otpHash: string, ttlMs: number) {
    const map = await this.load();
    const now = Date.now();
    const challenge: OtpChallenge = {
      id: randomBytes(18).toString("base64url"),
      email,
      otpHash,
      expiresAt: now + ttlMs,
      attemptCount: 0,
      lastSentAt: now,
      verified: false,
      deliveryStatus: "pending",
      sendingSince: null,
    };
    map.set(challenge.id, challenge);
    await this.persist();
    return challenge;
  }

  async getById(id: string) {
    return (await this.load()).get(id);
  }

  private async must(id: string) {
    const c = await this.getById(id);
    if (!c) throw new Error("challenge_not_found");
    return c;
  }

  /** Atomically starts the resend cooldown; false while it is still running. */
  async claimResend(id: string, cooldownMs: number) {
    const c = await this.must(id);
    const now = Date.now();
    if (now - c.lastSentAt < cooldownMs) return false;
    c.lastSentAt = now;
    await this.persist();
    return true;
  }

  async replaceOtp(id: string, otpHash: string, ttlMs: number) {
    const c = await this.must(id);
    c.otpHash = otpHash;
    c.expiresAt = Date.now() + ttlMs;
    c.attemptCount = 0;
    await this.persist();
    return c;
  }

  async incrementAttempts(id: string) {
    const c = await this.must(id);
    c.attemptCount += 1;
    await this.persist();
    return c;
  }

  async markVerified(id: string) {
    const c = await this.must(id);
    c.verified = true;
    await this.persist();
    return c;
  }

  /** Atomically claims the delivery, so concurrent requests can never send the documents twice. */
  async claimDelivery(id: string): Promise<"claimed" | "sent" | "in_progress"> {
    const c = await this.must(id);
    if (c.deliveryStatus === "sent") return "sent";
    const now = Date.now();
    if (c.deliveryStatus === "sending" && now - (c.sendingSince ?? 0) < STALE_SENDING_MS) return "in_progress";
    c.deliveryStatus = "sending";
    c.sendingSince = now;
    await this.persist();
    return "claimed";
  }

  async finishDelivery(id: string, status: "sent" | "failed") {
    const c = await this.must(id);
    c.deliveryStatus = status;
    c.sendingSince = null;
    await this.persist();
  }

  async invalidate(id: string) {
    (await this.load()).delete(id);
    await this.persist();
  }
}

const g = globalThis as unknown as { __blubeardOtpStore?: FileOtpStore };

/** One store per process, shared by every route handler and surviving development hot reloads. */
export function getOtpStore() {
  g.__blubeardOtpStore ??= new FileOtpStore(
    path.resolve(
      process.env.OTP_STORE_PATH || path.join(/*turbopackIgnore: true*/ process.cwd(), ".data", "otp-challenges.json"),
    ),
  );
  return g.__blubeardOtpStore;
}
