import TodoModel from "#m/Todos/TodoModel.ts";
import validateMongoID from "#u/validateMongoID.ts";
import checkFalsyResult from "#u/checkFalsyResult.ts";
import type { NextFunction, Request, Response } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { priority, folder } = req.body;

    validateMongoID({
      id: priority,
      field: "priority",
    });

    validateMongoID({
      id: folder,
      field: "folder",
    });

    const details = await TodoModel.create({
      user: req.body?.user?._id,
      ...req.body,
    });

    const result = details.toObject();

    Reflect.deleteProperty(result, "__v");
    Reflect.deleteProperty(result, "user");

    res.status(201).send({ message: "todo added successfully", result });
  } catch (error) {
    next(error);
  }
};

const search = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subject } = req.query;
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 10;

    if (!subject?.length) {
      next({ status: 422, message: "subject is required in request query" });
    }

    const allSearchResult = await TodoModel.find({
      subject: { $regex: subject, $options: "i" },
      user: req.body?.user?._id,
    })
      .select("-__v -user")
      .lean();

    const searchResult = await TodoModel.find({
      subject: { $regex: subject, $options: "i" },
      user: req.body?.user?._id,
    })
      .populate("status", "-__v")
      .populate("folder", "-__v")
      .populate("priority", "-__v")
      .select("-__v -user")
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .lean();

    const totalDocuments = allSearchResult.length;

    checkFalsyResult({ result: searchResult });

    res.send({
      message: "search result",
      page: +page,
      limit: +limit,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / +limit),
      searchResult,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 10;

    const todos = await TodoModel.find({ user: req.body?.user?._id })
      .populate("status", "-__v")
      .populate("folder", "-__v")
      .populate("priority", "-__v")
      .select("-__v -user")
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .lean();

    const totalDocuments = await TodoModel.countDocuments({
      user: req.body?.user?._id,
    }).lean();

    checkFalsyResult({ result: todos });

    res.json({
      message: "all todos list",
      page: +page,
      limit: +limit,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / +limit),
      todos,
    });
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

const getRecent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await TodoModel.find({ user: req.body?.user?._id })
      .populate("status", "-__v")
      .populate("folder", "-__v")
      .populate("priority", "-__v")
      .select("-__v -user")
      .sort({ _id: -1 })
      .limit(3)
      .lean();

    checkFalsyResult({ result: todos });

    res.json({ message: "recent todos", todos });
  } catch (error) {
    next(error);
  }
};

const getTodosOverview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allTodosCount = await TodoModel.countDocuments({
      user: req.body?.user?._id,
    }).lean();

    const doneTodosCount = await TodoModel.countDocuments({
      user: req.body?.user?._id,
      status: "67bc63eca74538ab87c5a922",
    }).lean();

    const notDoneTodosCount = await TodoModel.countDocuments({
      user: req.body?.user?._id,
      status: "67bc643ca74538ab87c5a923",
    }).lean();

    const awaitTodosCount = await TodoModel.countDocuments({
      user: req.body?.user?._id,
      status: "67bc6447a74538ab87c5a924",
    }).lean();

    const inProgressTodosCount = await TodoModel.countDocuments({
      user: req.body?.user?._id,
      status: "67bc6464a74538ab87c5a925",
    }).lean();

    res.json({
      message: "todos count based on their status",
      allTodosCount,
      doneTodos: {
        doneTodosCount,
        doneTodosPercent:
          Math.floor((doneTodosCount / allTodosCount) * 100) || 0,
      },
      notDoneTodos: {
        notDoneTodosCount,
        notDoneTodosPercent:
          Math.floor((notDoneTodosCount / allTodosCount) * 100) || 0,
      },
      awaitTodos: {
        awaitTodosCount,
        awaitTodosPercent:
          Math.floor((awaitTodosCount / allTodosCount) * 100) || 0,
      },
      inProgressTodos: {
        inProgressTodosCount,
        inProgressTodosPercent:
          Math.floor((inProgressTodosCount / allTodosCount) * 100) || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { priority, folder, status } = req.body;
    const { todoID } = req.params;

    validateMongoID({
      id: todoID,
      field: "todoID param",
    });

    validateMongoID({
      id: priority,
      field: "priority",
    });

    validateMongoID({
      id: folder,
      field: "folder",
    });

    validateMongoID({
      id: status,
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

export {
  create,
  search,
  getAll,
  getOne,
  getRecent,
  getTodosOverview,
  edit,
  remove,
};
