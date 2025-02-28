import type { NextFunction, Request, Response } from "express";

const validateReqBody = (validationSchema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result: any = validationSchema.validate(req.body);
      const error = { field: result[0]?.path, error: result[0]?.message };

      if (error.field && result.length) return res.status(422).json(error);

      next();
    } catch (error) {
      next(error);
    }
  };
};

export { validateReqBody };
