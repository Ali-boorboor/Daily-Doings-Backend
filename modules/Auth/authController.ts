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
    Reflect.deleteProperty(result, "_id");
    Reflect.deleteProperty(result, "__v");

    res.status(201).json({ message: "user signed up successfully", result });
  } catch (error) {
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

    if (user?.cover) {
      res.cookie("cover", process.env.FILE_ADDRESS + `/${user?.cover}`, {
        maxAge: 864000000,
        httpOnly: false,
        secure: true,
        signed: false,
        sameSite: "strict",
      });
    }

    res.cookie("username", user?.username, {
      maxAge: 864000000,
      httpOnly: false,
      secure: true,
      signed: false,
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

    const userDatas = await UserModel.findById(decodedToken?._id).lean();

    checkFalsyResult({
      result: userDatas,
      status: 404,
      message: "no user exists with this id",
    });

    res.json({ message: "ok" });
  } catch (error: any) {
    next({ status: 401, message: error?.message });
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("username");
    res.clearCookie("cover");

    res.json({ message: "logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export { signup, login, auth, logout };
