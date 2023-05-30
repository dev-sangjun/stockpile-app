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
  const errorMessage = err.message || "Something went wrong";
  if (err && err.status) {
    return res.status(err.status).json({
      message: errorMessage,
    });
  }
  return res.status(400).json({
    message: errorMessage,
  });
};
