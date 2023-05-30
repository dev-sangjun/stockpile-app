import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

interface Error {
  status?: number;
  message?: string;
}

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  if (err && err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  return res.status(400).json({
    message: "Something went wrong",
  });
};
