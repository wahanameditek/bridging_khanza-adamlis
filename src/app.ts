import express from "express";
import { registrationRoutes } from "./routes/registrationRoutes";
import { apiKeyMiddleware } from "./middleware/apiKeyMiddleware";
import { rateLimitMiddleware } from "./middleware/rateLimitMiddleware";
import { hasilRoutes } from "./routes/hasilRoutes";

const app = express();
app.use(express.json());

// Apply middlewares
// app.use(apiKeyMiddleware);
app.use(rateLimitMiddleware);
app.set("trust proxy", 1);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// app.use(rateLimit({...}));


app.use("/adam-lis", registrationRoutes);
app.use("/adam-lis", hasilRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

export { app };
