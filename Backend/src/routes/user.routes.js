import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutuser,
  getCurrentUser,
  listAccount,
} from "../controllers/user.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/Signup").post(registerUser);

router.route("/SignIn").post(loginUser);

router.route("/logout").get(verifyjwt, logoutuser);

router.route("/current-user").get(verifyjwt, getCurrentUser);

router.route("/listing/:id").get(verifyjwt, listAccount);

export default router;
