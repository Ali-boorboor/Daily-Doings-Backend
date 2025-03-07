import express from "express";
import authGuard from "#/middlewares/authGuard";
import { validateReqBody } from "#/middlewares/validateRequest";
import { postValidations, putValidations } from "#v/todayTodosValidations.ts";
import {
  create,
  getAll,
  editSome,
  removeOne,
} from "#m/TodayTodos/todayTodosController.ts";

const todayTodosRouter: any = express.Router();

/**
 * @swagger
 * /today-todo:
 *   post:
 *     summary: Add today todo
 *     description: Private Route Login To Access
 *     tags:
 *       - Today Todos 📃
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 description: The Todo's subject
 *               priority:
 *                 type: string
 *                 description: The Todo's priority id
 *     responses:
 *       201:
 *         description: Todo added successfully
 *       422:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error - Something went wrong
 *   get:
 *     summary: Get all today todos
 *     description: Private Route Login To Access
 *     tags:
 *       - Today Todos 📃
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *     - name: page
 *       in: query
 *       description: The page number
 *       required: false
 *       type: number
 *     - name: limit
 *       in: query
 *       description: The limit per page number
 *       required: false
 *       type: number
 *     responses:
 *       200:
 *         description: Todos datas
 *       204:
 *         description: No todo exists
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
todayTodosRouter
  .use(authGuard)
  .route("/")
  .post(validateReqBody(postValidations), create)
  .get(getAll);

/**
 * @swagger
 * /today-todo/check:
 *   put:
 *     summary: Edit some today todos
 *     description: Private Route Login To Access
 *     tags:
 *       - Today Todos 📃
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               checked:
 *                 type: array
 *                 items:
 *                    type: string
 *                 description: The Todo's checked ids array
 *     responses:
 *       200:
 *         description: Todo edited successfully
 *       422:
 *         description: Invalid input data
 *       404:
 *         description: Todo Not found
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
todayTodosRouter.put(
  "/check",
  authGuard,
  validateReqBody(putValidations),
  editSome
);

/**
 * @swagger
 * /today-todo/{todoID}:
 *   delete:
 *     parameters:
 *     - name: todoID
 *       in: path
 *       description: The todo mongo ID
 *       required: true
 *       type: string
 *     summary: Remove one today todo
 *     description: Private Route Login To Access
 *     tags:
 *       - Today Todos 📃
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Todo removed successfully
 *       422:
 *         description: Invalid input data
 *       404:
 *         description: Todo Not found
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
todayTodosRouter.delete("/:todoID", authGuard, removeOne);

export default todayTodosRouter;
