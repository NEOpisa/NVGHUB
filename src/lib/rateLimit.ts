// Rate limiter simples em memória (por instância). Em serverless o Map vive só
// enquanto a instância está quente, então é best-effort — suficiente para conter
// abuso básico dos formulários sem depender de infra externa (Redis etc.).
type Options = { windowMs: number; max: number };

export function createRateLimiter({ windowMs, max }: Options) {
  const hits = new Map<string, number[]>();
  let lastSweep = Date.now();

  return function isRateLimited(ip: string): boolean {
    const now = Date.now();

    // Varredura periódica: remove IPs cujos timestamps já expiraram todos, para
    // o Map não crescer indefinidamente com IPs que vieram uma única vez.
    if (now - lastSweep > windowMs) {
      for (const [key, ts] of hits) {
        if (ts.every((t) => now - t >= windowMs)) hits.delete(key);
      }
      lastSweep = now;
    }

    const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
    if (timestamps.length >= max) {
      hits.set(ip, timestamps);
      return true;
    }
    timestamps.push(now);
    hits.set(ip, timestamps);
    return false;
  };
}
