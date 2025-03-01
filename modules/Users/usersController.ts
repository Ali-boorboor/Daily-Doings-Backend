import path from "path";
import removeFile from "#u/removeFile.ts";
import UserModel from "#m/Users/UserModel";
import emailConfigs from "#c/emailConfigs.ts";
import comparePassword from "#u/comparePassword.ts";
import checkFalsyResult from "#u/checkFalsyResult.ts";
import type { Request, Response, NextFunction } from "express";

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const userDetails = await UserModel.findById(req.body?.user?._id).lean();

    checkFalsyResult({
      result: userDetails,
      status: 404,
      message: "user not found",
    });

    const isPasswordCorrect = comparePassword(
      currentPassword,
      userDetails?.password!
    );

    checkFalsyResult({
      result: isPasswordCorrect,
      status: 401,
      message: "password is wrong",
    });

    await UserModel.findByIdAndUpdate(req.body?.user?._id, {
      password: newPassword,
    }).lean();

    res.json({ message: "password changed successfully" });
  } catch (error) {
    next(error);
  }
};

const changeUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newUsername, password } = req.body;

    const repeatedUser = await UserModel.findOne(
      { username: newUsername },
      "-password"
    ).lean();

    if (repeatedUser) {
      throw {
        status: 409,
        message: "user with this username already exists",
      };
    }

    const userDetails = await UserModel.findById(req.body?.user?._id).lean();

    checkFalsyResult({
      result: userDetails,
      status: 404,
      message: "user not found",
    });

    const isPasswordCorrect = comparePassword(password, userDetails?.password!);

    checkFalsyResult({
      result: isPasswordCorrect,
      status: 401,
      message: "password is wrong",
    });

    await UserModel.findByIdAndUpdate(req.body?.user?._id, {
      username: newUsername,
    }).lean();

    res.cookie("username", newUsername, {
      maxAge: 864000000,
      httpOnly: false,
      secure: true,
      signed: false,
      sameSite: "strict",
    });

    res.json({ message: "username changed successfully" });
  } catch (error) {
    next(error);
  }
};

const changeCover = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
    const cover = req.file?.filename;

    checkFalsyResult({
      result: cover,
      status: 422,
      message: "cover is required",
    });

    const userDetails = await UserModel.findOne({ _id: req.body?.user?._id });

    if (!userDetails) {
      removeFile(path.join(__dirname, "../../public/covers", `${cover}`));

      throw { status: 404, message: "user not found" };
    }

    const isPasswordCorrect = comparePassword(password, userDetails?.password);

    if (!isPasswordCorrect) {
      removeFile(path.join(__dirname, "../../public/covers", `${cover}`));

      throw { status: 401, message: "password is wrong" };
    }

    removeFile(
      path.join(__dirname, "../../public/covers", `${userDetails?.cover}`)
    );

    await UserModel.findByIdAndUpdate(req.body?.user?._id, { cover });

    res.cookie("cover", process.env.FILE_ADDRESS + `/${cover}`, {
      maxAge: 864000000,
      httpOnly: false,
      secure: true,
      signed: false,
      sameSite: "strict",
    });

    res.json({ message: "cover changed successfully" });
  } catch (error) {
    const cover = req.file?.filename;

    removeFile(path.join(__dirname, "../../public/covers", `${cover}`));

    next(error);
  }
};

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { identifier } = req.body;

    const userDetails = await UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    }).lean();

    checkFalsyResult({
      result: userDetails,
      status: 404,
      message: "no user exists with this identifier",
    });

    const newPassword = String(Math.ceil(Math.random() * 1000000));

    emailConfigs.sendMail(
      {
        to: userDetails?.email,
        subject: "Your New Password",
        text: `Your new password is: ${newPassword}, please change the password once you logged in.`,
      },
      (error) => {
        if (error) next(error);
      }
    );

    await UserModel.findByIdAndUpdate(userDetails?._id, {
      password: newPassword,
    });

    return res.json({ message: "new password sent to email" });
  } catch (error) {
    next(error);
  }
};

export { changePassword, changeUsername, changeCover, forgotPassword };
