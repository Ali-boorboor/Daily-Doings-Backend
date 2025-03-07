import validateMongoID from "#u/validateMongoID.ts";
import checkFalsyResult from "#u/checkFalsyResult.ts";
import TodayTodoModel from "#m/TodayTodos/TodayTodoModel";
import type { NextFunction, Request, Response } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { priority } = req.body;

    validateMongoID({
      id: priority,
      field: "priority",
    });

    const details = await TodayTodoModel.create({
      user: req.body?.user?._id,
      ...req.body,
    });

    const result = details.toObject();

    Reflect.deleteProperty(result, "user");
    Reflect.deleteProperty(result, "__v");

    res.status(201).send({ message: "todo added successfully", result });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todayTodos = await TodayTodoModel.find({
      user: req.body?.user?._id,
    })
      .populate("priority", "-__v")
      .populate("status", "-__v")
      .select("-user -__v")
      .lean();

    checkFalsyResult({ result: todayTodos });

    res.json({
      message: "all todos list",
      todayTodos,
    });
  } catch (error) {
    next(error);
  }
};

const editSome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { checked } = req.body;

    await TodayTodoModel.updateMany(
      { user: req.body?.user?._id },
      {
        status: "67bc643ca74538ab87c5a923",
      }
    ).lean();

    await TodayTodoModel.updateMany(
      {
        user: req?.body?.user?._id,
        _id: { $in: checked },
      },
      {
        status: "67bc63eca74538ab87c5a922",
      }
    ).lean();

    res.json({ message: "todos status changed" });
  } catch (error) {
    next(error);
  }
};

const removeOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoID } = req.params;

    validateMongoID({
      id: todoID,
      field: "todoID param",
    });

    const todoDetails = await TodayTodoModel.findById(todoID).lean();

    checkFalsyResult({
      result: todoDetails,
      status: 404,
      message: "todo not found or already removed",
    });

    await TodayTodoModel.findByIdAndDelete(todoID);

    res.json({ message: "todo removed successfully" });
  } catch (error) {
    next(error);
  }
};

export { create, getAll, editSome, removeOne };
