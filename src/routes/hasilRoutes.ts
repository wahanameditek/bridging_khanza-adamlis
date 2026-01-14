import { Router } from "express";
import { container } from "../container/container";

const router = Router();
const hasilController = container.hasilController;

router.post("/hasil", hasilController.insert);
router.put("/hasil/:no_lab", hasilController.update);

export { router as hasilRoutes };
