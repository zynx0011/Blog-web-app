import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutuser,
  getCurrentUser,
  listAccount,
  updateAccoutDetails,
  changeCurrentUserPassword,
  forgotPassword,
  // resetPassword,
  changeforgotPassword,
  getUser,
} from "../controllers/user.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/Signup").post(registerUser);

router.route("/SignIn").post(loginUser);

router.route("/logout").get(verifyjwt, logoutuser);

router.route("/current-user/:id").get(verifyjwt, getCurrentUser);

router.route("/listing/:id").get(verifyjwt, listAccount);

router.route("/update/:id").put(verifyjwt, updateAccoutDetails);

router.route("/change-password").post(verifyjwt, changeCurrentUserPassword);

router.route("/:id").get(verifyjwt, getUser);

router.route("/forgotPassword").post(forgotPassword);
// router.route("/reset-password/:id").get(resetPassword);
router.route("/reset-password/:userId").post(changeforgotPassword);

export default router;
