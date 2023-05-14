import { Router } from "express";
import auth from "../../../middlewares/auth.js";
import usersController from "../../../controllers/public/users/users.controller.js";

const router = Router();

router.post("/user-signup", usersController.signup);
router.post("/user-signin", usersController.signin);
router.get("/user-details", auth, usersController.getUserDetails);

export default router;
