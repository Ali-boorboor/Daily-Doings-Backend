import path from "path";
import jwt from "jsonwebtoken";
import removeFile from "#u/removeFile.ts";
import UserModel from "#m/Users/UserModel.ts";
import comparePassword from "#u/comparePassword.ts";
import checkFalsyResult from "#u/checkFalsyResult.ts";
import generateAccessToken from "#u/generateAccessToken.ts";
import type { Request, Response, NextFunction } from "express";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email } = req.body;
    const cover = req.file?.filename;

    const repeatedUser = await UserModel.findOne(
      {
        $or: [{ username }, { email }],
      },
      "-password"
    ).lean();

    if (repeatedUser) {
      removeFile(path.join(__dirname, "../../public/covers", `${cover}`));

      throw {
        status: 409,
        message: "user with this datas (email or username) already exists",
      };
    }

    const details = await UserModel.create({
      cover,
      ...req.body,
    });

    const result = details.toObject();

    Reflect.deleteProperty(result, "password");

    res.status(201).json({ message: "user signed up successfully", result });
  } catch (error) {
    const cover = req.file?.filename;

    removeFile(path.join(__dirname, "../../public/covers", `${cover}`));

    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { identifier, password } = req.body;

    const user = await UserModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    }).lean();

    checkFalsyResult({
      result: user,
      status: 404,
      message: "no user exists with this identifier",
    });

    const isPasswordCorrect = comparePassword(password, user?.password!);

    checkFalsyResult({
      result: isPasswordCorrect,
      status: 401,
      message: "password is wrong",
    });

    const accessToken = generateAccessToken({
      _id: user?._id,
      username: user?.username,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 864000000,
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite: "strict",
    });

    res.json({ message: "logged in successfully" });
  } catch (error) {
    next(error);
  }
};

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.signedCookies["accessToken"];

    if (!accessToken) {
      throw { status: 401, message: "access denied" };
    }

    const decodedToken: any = jwt.verify(
      accessToken,
      process.env.SECRET_ACCESS_TOKEN!
    );

    res.json({
      message: "ok",
      id: decodedToken?._id,
      username: decodedToken?.username,
    });
  } catch (error: any) {
    next({ status: 401, message: error?.message });
  }
};

export { signup, login, auth };
