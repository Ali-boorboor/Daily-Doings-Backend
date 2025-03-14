import express from "express";
import authGuard from "#/middlewares/authGuard";
import { validateReqBody } from "#/middlewares/validateRequest";
import { postValidations, putValidations } from "#v/todosValidations.ts";
import {
  create,
  search,
  getAll,
  getOne,
  getRecent,
  getTodosOverview,
  edit,
  remove,
} from "#m/Todos/todosController.ts";

const todosRouter: any = express.Router();

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Add todo
 *     description: Private Route Login To Access
 *     tags:
 *       - Todos 📃
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
 *               folder:
 *                 type: string
 *                 description: The Todo's folder id
 *               labelColor:
 *                 type: string
 *                 description: The Todo's labelColor
 *               isListTodo:
 *                 type: number
 *                 enum:
 *                    -0
 *                    -1
 *                 description: The Todo's type
 *               description:
 *                 type: string
 *                 description: The Todo's description
 *               listItems:
 *                 type: array
 *                 items:
 *                    type: string
 *                 description: The Todo's listItems
 *     responses:
 *       201:
 *         description: Todo added successfully
 *       422:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
todosRouter
  .route("/")
  .post(authGuard, validateReqBody(postValidations), create);
/**
 * @swagger
 * /todo/search:
 *   get:
 *     summary: Search todos based on their subject
 *     description: Private Route Login To Access
 *     tags:
 *       - Todos 📃
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *     - name: subject
 *       in: query
 *       description: The todo subject
 *       required: true
 *       type: string
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
 *         description: Todos list
 *       204:
 *         description: No todo exists
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
todosRouter.route("/search").get(authGuard, search);

/**
 * @swagger
 * /todo/get-all:
 *   get:
 *     summary: Get all todos
 *     description: Private Route Login To Access
 *     tags:
 *       - Todos 📃
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
 *         description: Todos list
 *       204:
 *         description: No todo exists
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
todosRouter.route("/get-all").get(authGuard, getAll);

/**
 * @swagger
 * /todo/get-recent:
 *   get:
 *     summary: Get Recent todos
 *     description: Private Route Login To Access
 *     tags:
 *       - Todos 📃
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Todos list
 *       204:
 *         description: No todo exists
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
todosRouter.route("/get-recent").get(authGuard, getRecent);

/**
 * @swagger
 * /todo/get-overview:
 *   get:
 *     summary: Get Overview of todos based on their status
 *     description: Private Route Login To Access
 *     tags:
 *       - Todos 📃
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Todos list
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
todosRouter.route("/get-overview").get(authGuard, getTodosOverview);

/**
 * @swagger
 * /todo/{todoID}:
 *   get:
 *     parameters:
 *     - name: todoID
 *       in: path
 *       description: The todo mongo ID
 *       required: true
 *       type: string
 *     summary: Get one todo
 *     description: Private Route Login To Access
 *     tags:
 *       - Todos 📃
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Todo datas
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error - Something went wrong
 *   put:
 *     parameters:
 *     - name: todoID
 *       in: path
 *       description: The todo mongo ID
 *       required: true
 *       type: string
 *     summary: Edit one todo
 *     description: Private Route Login To Access
 *     tags:
 *       - Todos 📃
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
 *               folder:
 *                 type: string
 *                 description: The Todo's folder id
 *               status:
 *                 type: string
 *                 description: The Todo's folder id
 *               labelColor:
 *                 type: string
 *                 description: The Todo's labelColor
 *               isListTodo:
 *                 type: number
 *                 enum:
 *                    -0
 *                    -1
 *                 description: The Todo's type
 *               description:
 *                 type: string
 *                 description: The Todo's description
 *               listItems:
 *                 type: array
 *                 items:
 *                    type: string
 *                 description: The Todo's listItems
 *     responses:
 *       200:
 *         description: Todo edited successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error - Something went wrong
 *   delete:
 *     parameters:
 *     - name: todoID
 *       in: path
 *       description: The todo mongo ID
 *       required: true
 *       type: string
 *     summary: Remove one todo
 *     description: Private Route Login To Access
 *     tags:
 *       - Todos 📃
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Todo removed successfully
 *       404:
 *         description: Todo not found or already deleted
 *       500:
 *         description: Internal Server Error - Something went wrong
 */
todosRouter
  .use(authGuard)
  .route("/:todoID")
  .get(getOne)
  .put(validateReqBody(putValidations), edit)
  .delete(remove);

export default todosRouter;
