import crypto from "crypto";

export function getRequestId(req: any, body: any) {
  const headerKey =
    (req.headers["idempotency-key"] as string) ||
    (req.headers["x-idempotency-key"] as string) ||
    "";

  if (headerKey && headerKey.trim()) return headerKey.trim();

  // fallback: hash body (stabil untuk request yang sama)
  const raw = JSON.stringify(body ?? {});
  return crypto.createHash("sha256").update(raw).digest("hex").slice(0, 40);
}
