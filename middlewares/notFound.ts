import type { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res
    .status(404)
    .json({
      message: "no api or route exists with this path",
      type: "not found",
    });
};

export default notFound;
