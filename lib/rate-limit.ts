// Best-effort rate limiting for the submission API route.
//
// IMPORTANT: on serverless hosts (Vercel/Netlify functions) each cold start
// gets a fresh module scope, so this in-memory Map does NOT guarantee a
// global limit across all instances. It still stops rapid-fire abuse within
// a warm instance and is a reasonable default for a free-tier, database-free
// deployment. For strict guarantees, swap this for a shared store such as
// Upstash Redis (see README → "Hardening rate limits").

type Bucket = { count: number; firstRequestAt: number };

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const buckets = new Map<string, Bucket>();

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const existing = buckets.get(identifier);

  if (!existing || now - existing.firstRequestAt > WINDOW_MS) {
    buckets.set(identifier, { count: 1, firstRequestAt: now });
    return { allowed: true };
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, retryAfterMs: WINDOW_MS - (now - existing.firstRequestAt) };
  }

  existing.count += 1;
  return { allowed: true };
}

// Periodically evict old buckets so the Map doesn't grow unbounded in a
// long-lived (non-serverless) Node process.
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets.entries()) {
    if (now - bucket.firstRequestAt > WINDOW_MS) buckets.delete(key);
  }
}, WINDOW_MS).unref?.();
