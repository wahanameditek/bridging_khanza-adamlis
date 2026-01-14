import { Request, Response, NextFunction } from "express";

const VALID_API_KEYS = [
  process.env.API_KEY_1 || "lis-dev-key",
  process.env.API_KEY_2 || "simrs-dev-key",
];

export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const useApiKey = process.env.USE_API_KEY === "true";

  // kalau disable auth → langsung lanjut
  if (!useApiKey) {
    (req as any).apiKey = "NO-AUTH"; // isi dummy biar audit tetap jalan
    return next();
  }

  const apiKey = req.header("X-API-KEY");

  if (!apiKey || !VALID_API_KEYS.includes(apiKey)) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or missing API key",
    });
  }

  (req as any).apiKey = apiKey;
  next();
}
