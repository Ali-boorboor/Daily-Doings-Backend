import express from "express";
import uploader from "#/middlewares/uploader";
import { login, signup, auth } from "#m/Auth/authController";
import { validateReqBody } from "#/middlewares/validateRequest";
import { loginValidations, signupValidations } from "#v/usersValidations";

const authRouter: any = express.Router();

authRouter.post(
  "/signup",
  uploader,
  validateReqBody(signupValidations),
  signup
);

authRouter.post("/login", validateReqBody(loginValidations), login);

authRouter.post("/auth", auth);

export default authRouter;
