import express from "express";
import authGuard from "#/middlewares/authGuard";
import { validateReqBody } from "#/middlewares/validateRequest";
import { postValidations } from "#v/todayTodosValidations.ts";
import {
  create,
  getAll,
  editAll,
  removeAll,
  editOne,
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
 *     responses:
 *       200:
 *         description: Todos datas
 *       204:
 *         description: No todo exists
 *       500:
 *         description: Internal Server Error - Something went wrong
 *   put:
 *     summary: Edit all today todos
 *     description: Private Route Login To Access
 *     tags:
 *       - Today Todos 📃
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Todo edited successfully
 *       500:
 *         description: Internal Server Error - Something went wrong
 *   delete:
 *     summary: Remove all today todos
 *     description: Private Route Login To Access
 *     tags:
 *       - Today Todos 📃
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Todos removed successfully
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
todayTodosRouter
  .use(authGuard)
  .route("/")
  .post(validateReqBody(postValidations), create)
  .get(getAll)
  .put(editAll)
  .delete(removeAll);

/**
 * @swagger
 * /today-todo/{todoID}:
 *   put:
 *     parameters:
 *     - name: todoID
 *       in: path
 *       description: The todo mongo ID
 *       required: true
 *       type: string
 *     summary: Edit one today todo
 *     description: Private Route Login To Access
 *     tags:
 *       - Today Todos 📃
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Todo edited successfully
 *       422:
 *         description: Invalid input data
 *       404:
 *         description: Todo Not found
 *       500:
 *         description: Internal Server Error - Something went wrong
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
todayTodosRouter
  .use(authGuard)
  .route("/:todoID")
  .put(editOne)
  .delete(removeOne);

export default todayTodosRouter;
