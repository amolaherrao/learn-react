import { Router } from "express";
import usersController from "../../controllers/public/users.controller.js";

const router = Router();

router.post("/user-signup", usersController.signup);

export default router;
