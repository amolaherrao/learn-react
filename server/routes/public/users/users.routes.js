import { Router } from "express";
import auth from "../../../middlewares/auth.js";
import usersController from "../../../controllers/public/users/users.controller.js";

const router = Router();

router.post("/user-signup", usersController.signup);
router.post("/user-signin", usersController.signin);
router.get("/user-details", auth, usersController.getUserDetails);
router.post("/user-add-address", auth, usersController.addUserAddress);
router.put("/user-update-address", auth, usersController.updateUserAddress);
router.get("/user-address", auth, usersController.getUserAddress);
router.put("/user-remove-address", auth, usersController.deleteUserAddress);

export default router;
