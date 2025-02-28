import type { NextFunction, Request, Response } from "express";

const errorCatcher = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error?.status || 500).json({
    message: error?.message || "unknown server error",
    field: error?.field,
  });
};

export default errorCatcher;
