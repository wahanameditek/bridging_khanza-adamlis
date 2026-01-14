import rateLimit from "express-rate-limit";

// Limit 20 request per menit per IP
export const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
