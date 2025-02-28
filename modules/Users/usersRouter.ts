import express from "express";
import uploader from "#/middlewares/uploader";
import authGuard from "#/middlewares/authGuard";
import { validateReqBody } from "#/middlewares/validateRequest";
import {
  changePassword,
  changeUsername,
  changeCover,
  forgotPassword,
} from "#m/Users/usersController";
import {
  changeCoverValidations,
  changePassValidations,
  changeUsernameValidations,
  forgotPassValidations,
} from "#v/usersValidations.ts";

const usersRouter: any = express.Router();

usersRouter.put(
  "/change-password",
  authGuard,
  validateReqBody(changePassValidations),
  changePassword
);

usersRouter.put(
  "/change-username",
  authGuard,
  validateReqBody(changeUsernameValidations),
  changeUsername
);

usersRouter.put(
  "/change-cover",
  uploader,
  authGuard,
  validateReqBody(changeCoverValidations),
  changeCover
);

usersRouter.post(
  "/forgot-password",
  validateReqBody(forgotPassValidations),
  forgotPassword
);

export default usersRouter;
