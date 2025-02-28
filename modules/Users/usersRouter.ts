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

/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Will send the new password to user's email
 *     tags:
 *       - Users 👤
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: The user's identifier (email or username)
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       422:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
usersRouter.post(
  "/forgot-password",
  validateReqBody(forgotPassValidations),
  forgotPassword
);

/**
 * @swagger
 * /user/change-password:
 *   put:
 *     summary: Change user password
 *     description: Private Route Login To Access
 *     tags:
 *       - Users 👤
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The user's current password
 *               newPassword:
 *                 type: string
 *                 description: The user's new password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       422:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized (or password is wrong)
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
usersRouter.put(
  "/change-password",
  authGuard,
  validateReqBody(changePassValidations),
  changePassword
);

/**
 * @swagger
 * /user/change-username:
 *   put:
 *     summary: Change username
 *     description: Private Route Login To Access
 *     tags:
 *       - Users 👤
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newUsername:
 *                 type: string
 *                 description: The user's new username
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Username changed successfully
 *       422:
 *         description: Invalid input data
 *       409:
 *         description: User with this username already exists
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized (or password is wrong)
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
usersRouter.put(
  "/change-username",
  authGuard,
  validateReqBody(changeUsernameValidations),
  changeUsername
);

/**
 * @swagger
 * /user/change-cover:
 *   put:
 *     summary: Change user cover
 *     description: Private Route Login To Access
 *     tags:
 *       - Users 👤
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The user's password
 *               cover:
 *                 type: file
 *                 description: The user's new cover
 *     responses:
 *       200:
 *         description: Cover changed successfully
 *       422:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized (or password is wrong)
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
usersRouter.put(
  "/change-cover",
  uploader,
  authGuard,
  validateReqBody(changeCoverValidations),
  changeCover
);

export default usersRouter;
