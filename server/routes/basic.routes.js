import { Router } from "express";
import basicController from "../controllers/basic.controller.js";

const router = Router();

router.get("/basic", basicController.basic);
router.get("/basic/:id", basicController.getRouteDynamicId);

export default router;
