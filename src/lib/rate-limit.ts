import { createHash } from "node:crypto";
import { getStore } from "./store";

const hits = new Map<string, { count: number; until: number }>();

function memoryRateLimit(
  key: string,
  now: number,
  max: number,
  windowMs: number,
) {
  for (const [k, v] of hits) if (v.until <= now) hits.delete(k);
  const value = hits.get(key) ?? { count: 0, until: now + windowMs };
  value.count++;
  hits.set(key, value);
  return value.count <= max;
}

export async function rateLimit(
  key: string,
  max = 5,
  windowMs = 10 * 60 * 1000,
): Promise<boolean | null> {
  const now = Date.now();
  const store = getStore();
  if (store) {
    try {
      const hash = createHash("sha256").update(key).digest("hex");
      const count = Number(
        await store.eval(
          "local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]) end; return n",
          [`vooruit:rate:${hash}:${Math.floor(now / windowMs)}`],
          [windowMs],
        ),
      );
      return count <= max;
    } catch {
      console.error("[rate-limit] opslag niet beschikbaar; mémoire utilisée");
      return memoryRateLimit(key, now, max, windowMs);
    }
  }
  return memoryRateLimit(key, now, max, windowMs);
}

export function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "onbekend"
  );
}
