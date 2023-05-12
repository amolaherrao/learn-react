import { Router } from "express";
import welcomeController from "../controllers/welcome.controller.js";

const router = Router();

router.get("/", welcomeController.welcome);

export default router;
