import express from "express";
import authGuard from "#/middlewares/authGuard";
import { validateReqBody } from "#/middlewares/validateRequest";
import { postValidations, putValidations } from "#v/todosValidations.ts";
import {
  create,
  getAll,
  getOne,
  edit,
  remove,
} from "#m/Todos/todosController.ts";

const todosRouter: any = express.Router();

todosRouter
  .route("/")
  .post(authGuard, validateReqBody(postValidations), create);

todosRouter.route("/get-all").get(authGuard, getAll);

todosRouter
  .use(authGuard)
  .route("/:todoID")
  .get(getOne)
  .put(validateReqBody(putValidations), edit)
  .delete(remove);

export default todosRouter;
