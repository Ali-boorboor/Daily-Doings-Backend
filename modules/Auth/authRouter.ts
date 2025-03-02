import express from "express";
import uploader from "#/middlewares/uploader";
import authGuard from "#/middlewares/authGuard";
import { loginValidations, signupValidations } from "#v/usersValidations";
import { login, signup, auth, logout } from "#m/Auth/authController";
import { validateReqBody } from "#/middlewares/validateRequest";

const authRouter: any = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Signup user
 *     description: Create new user account
 *     tags:
 *       - Auth 🔒
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username (Required)
 *               email:
 *                 type: string
 *                 description: Email (Required)
 *               password:
 *                 type: string
 *                 description: Password (Required)
 *               cover:
 *                 type: file
 *                 description: Cover (Not Required)
 *     responses:
 *       201:
 *         description: User signed up successfully
 *       422:
 *         description: Invalid input data
 *       409:
 *         description: User with this datas (email or username) already exists
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
authRouter.post(
  "/signup",
  uploader,
  validateReqBody(signupValidations),
  signup
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     description: Login to user account
 *     tags:
 *       - Auth 🔒
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
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       422:
 *         description: Invalid input data
 *       401:
 *         description: Password is wrong
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
authRouter.post("/login", validateReqBody(loginValidations), login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout
 *     description: Logout from account
 *     tags:
 *       - Auth 🔒
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       422:
 *         description: Invalid input data
 *       401:
 *         description: Access denied
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
authRouter.post("/logout", authGuard, logout);

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Authentication
 *     description: User authentication
 *     tags:
 *       - Auth 🔒
 *     responses:
 *       200:
 *         description: Ok
 *       422:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
authRouter.get("/auth", auth);

export default authRouter;
