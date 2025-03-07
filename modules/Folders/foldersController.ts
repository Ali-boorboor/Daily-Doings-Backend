import TodoModel from "#m/Todos/TodoModel.ts";
import FolderModel from "#m/Folders/FolderModel";
import validateMongoID from "#u/validateMongoID.ts";
import checkFalsyResult from "#u/checkFalsyResult.ts";
import type { NextFunction, Request, Response } from "express";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const repeatedFolder = await FolderModel.findOne({ name }).lean();

    if (repeatedFolder) {
      throw { status: 409, message: "folder by this name already exists" };
    }

    const details = await FolderModel.create({
      user: req.body?.user?._id,
      ...req.body,
    });

    const result = details.toObject();

    Reflect.deleteProperty(result, "user");
    Reflect.deleteProperty(result, "__v");

    res.status(201).json({ message: "folder created successfully", result });
  } catch (error) {
    next(error);
  }
};

const getAllFolders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 10;

    const folders = await FolderModel.find({
      user: req.body?.user?._id,
    })
      .select("-user -__v")
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .lean();

    const totalDocuments = await FolderModel.countDocuments({
      user: req.body?.user?._id,
    }).lean();

    checkFalsyResult({ result: folders });

    res.json({
      message: "all folders list",
      page: +page,
      limit: +limit,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / +limit),
      folders,
    });
  } catch (error) {
    next(error);
  }
};

const getOneFolderTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { folderID } = req.params;
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 10;

    validateMongoID({
      id: folderID,
      field: "folderID param",
    });

    const result = await TodoModel.find({
      user: req.body?.user?._id,
      folder: folderID,
    })
      .populate("status", "-__v")
      .populate("priority", "-__v")
      .populate("folder", "-__v -user -updatedAt -createdAt")
      .select("-__v -user")
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .lean();

    const totalDocuments = await TodoModel.countDocuments({
      user: req.body?.user?._id,
      folder: folderID,
    }).lean();

    checkFalsyResult({ result });

    res.json({
      message: "folder todos list",
      page: +page,
      limit: +limit,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / +limit),
      result,
    });
  } catch (error) {
    next(error);
  }
};

const getFoldersOverview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allFolders = await FolderModel.find({
      user: req.body?.user?._id,
    }).lean();

    const allTodos = await TodoModel.find({
      user: req.body?.user?._id,
    }).lean();

    let foldersOverview: {}[] = [];

    allFolders.forEach((folder) => {
      let doneTodos = 0;

      const folderTodos = allTodos.filter(
        (todo) => String(todo.folder) === String(folder._id)
      );

      folderTodos.forEach((todo) => {
        switch (String(todo?.status)) {
          case "67bc63eca74538ab87c5a922": {
            ++doneTodos;
            break;
          }
          default: {
            break;
          }
        }
      });

      foldersOverview.push({
        name: folder.name,
        doneTodos,
      });
    });

    res.json({
      message: "todos list based on their folder and status",
      foldersOverview,
    });
  } catch (error) {
    next(error);
  }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { folderID } = req.params;
    const { name } = req.body;

    validateMongoID({
      id: folderID,
      field: "folderID param",
    });

    const result = await FolderModel.findByIdAndUpdate(folderID, {
      name,
    }).lean();

    checkFalsyResult({
      result: result,
      status: 404,
      message: "no folder found",
    });

    res.json({ message: "folder updated successfully" });
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { folderID } = req.params;

    validateMongoID({
      id: folderID,
      field: "folderID param",
    });

    const result = await FolderModel.findByIdAndDelete(folderID).lean();

    checkFalsyResult({
      result: result,
      status: 404,
      message: "no folder found or already deleted",
    });

    res.json({ message: "folder removed successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  create,
  getAllFolders,
  getOneFolderTodos,
  getFoldersOverview,
  edit,
  remove,
};
