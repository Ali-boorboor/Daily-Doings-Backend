import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.signedCookies["accessToken"];

    if (!accessToken) {
      throw { status: 401, message: "access denied (private route)" };
    }

    const userDatas: any = jwt.verify(
      accessToken,
      process.env.SECRET_ACCESS_TOKEN!
    );

    req.body.user = { _id: userDatas?._id, username: userDatas?.username };

    next();
  } catch (error) {
    next(error);
  }
};

export default authGuard;
