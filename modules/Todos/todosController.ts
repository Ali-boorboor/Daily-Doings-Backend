import TodoModel from "#m/Todos/TodoModel.ts";
import validateMongoID from "#u/validateMongoID.ts";
import checkFalsyResult from "#u/checkFalsyResult.ts";
import type { NextFunction, Request, Response } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateMongoID({
      id: req.body?.priority,
      field: "priority",
    });

    validateMongoID({
      id: req.body?.folder,
      field: "folder",
    });

    const details = await TodoModel.create({
      user: req.body?.user?._id,
      ...req.body,
    });

    const result = details.toObject();

    Reflect.deleteProperty(result, "__v");

    res.status(201).send({ message: "todo added successfully", result });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await TodoModel.find({ user: req.body?.user?._id })
      .populate("status", "-__v")
      .populate("folder", "-__v")
      .populate("priority", "-__v")
      .select("-__v -user")
      .lean();

    checkFalsyResult({ result: todos });

    res.json({ message: "all todos list", todos });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoID } = req.params;

    validateMongoID({
      id: todoID,
      field: "todoID param",
    });

    const result = await TodoModel.findById(todoID)
      .populate("status", "-__v")
      .populate("folder", "-__v")
      .populate("priority", "-__v")
      .select("-__v -user")
      .lean();

    checkFalsyResult({
      result,
      status: 404,
      message: "todo not found",
    });

    res.json({ result });
  } catch (error) {
    next(error);
  }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoID } = req.params;

    validateMongoID({
      id: todoID,
      field: "todoID param",
    });

    validateMongoID({
      id: req.body?.priority,
      field: "priority",
    });

    validateMongoID({
      id: req.body?.folder,
      field: "folder",
    });

    validateMongoID({
      id: req.body?.status,
      field: "status",
    });

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      { _id: todoID },
      req.body
    )
      .select("-__v -priority -folder -status -labelColor -user")
      .lean();

    checkFalsyResult({
      result: updatedTodo,
      status: 404,
      message: "todo not found",
    });

    res.json({ message: "todo updated successfully", updatedTodo });
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoID } = req.params;

    validateMongoID({
      id: todoID,
      field: "todoID param",
    });

    const removedTodo = await TodoModel.findByIdAndDelete(todoID)
      .select("-__v -priority -status -folder -labelColor -user")
      .lean();

    checkFalsyResult({
      result: removedTodo,
      status: 404,
      message: "todo not found or already deleted",
    });

    res.json({ message: "todo removed successfully", removedTodo });
  } catch (error) {
    next(error);
  }
};

export { create, getAll, getOne, edit, remove };
