import express from "express";
import authGuard from "#/middlewares/authGuard";
import { validation } from "#v/foldersValidations.ts";
import { validateReqBody } from "#/middlewares/validateRequest";
import {
  create,
  getAllFolders,
  getOneFolderTodos,
  getFoldersOverview,
  getOneFolderOverview,
  edit,
  remove,
} from "#m/Folders/foldersController.ts";

const foldersRouter: any = express.Router();

/**
 * @swagger
 * /folder:
 *   post:
 *     summary: Create folder
 *     description: Private Route Login To Access
 *     tags:
 *       - Folders 📁
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of folder
 *     responses:
 *       201:
 *         description: Folder created successfully
 *       422:
 *         description: Invalid input data
 *       409:
 *         description: Folder by this name already exists
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error - Something went wrong
 *   get:
 *     summary: Get all folders
 *     description: Private Route Login To Access
 *     tags:
 *       - Folders 📁
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: All folders list
 *       404:
 *         description: Folder not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
foldersRouter
  .use(authGuard)
  .route("/")
  .post(validateReqBody(validation), create)
  .get(getAllFolders);

/**
 * @swagger
 * /folder/get-overview:
 *   get:
 *     summary: Get Overview of todos based on their folder and status
 *     description: Private Route Login To Access
 *     tags:
 *       - Folders 📁
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Todos list
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
foldersRouter.route("/get-overview").get(authGuard, getFoldersOverview);

/**
 * @swagger
 * /folder/get-one-overview/{folderID}:
 *   get:
 *     summary: Get Overview of one folder based on its todos with done status
 *     description: Private Route Login To Access
 *     parameters:
 *     - name: folderID
 *       in: path
 *       description: The folder mongo ID
 *       required: true
 *       type: string
 *     tags:
 *       - Folders 📁
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Todos list
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
foldersRouter
  .route("/get-one-overview/:folderID")
  .get(authGuard, getOneFolderOverview);

/**
 * @swagger
 * /folder/{folderID}:
 *   get:
 *     parameters:
 *     - name: folderID
 *       in: path
 *       description: The folder mongo ID
 *       required: true
 *       type: string
 *     summary: Get one folder todos
 *     description: Private Route Login To Access
 *     tags:
 *       - Folders 📁
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Folder todos list
 *       404:
 *         description: No folder found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error - Something went wrong
 *   put:
 *     parameters:
 *     - name: folderID
 *       in: path
 *       description: The folder mongo ID
 *       required: true
 *       type: string
 *     summary: Edit one folder
 *     description: Private Route Login To Access
 *     tags:
 *       - Folders 📁
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of folder
 *     responses:
 *       200:
 *         description: Folder's name changed successfully
 *       404:
 *         description: No folder found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error - Something went wrong
 *   delete:
 *     parameters:
 *     - name: folderID
 *       in: path
 *       description: The folder mongo ID
 *       required: true
 *       type: string
 *     summary: Delete one folder
 *     description: Private Route Login To Access
 *     tags:
 *       - Folders 📁
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Folder removed successfully
 *       404:
 *         description: No folder found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
foldersRouter
  .use(authGuard)
  .route("/:folderID")
  .get(getOneFolderTodos)
  .put(validateReqBody(validation), edit)
  .delete(remove);

export default foldersRouter;
