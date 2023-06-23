import { Prisma } from "@prisma/client";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

interface Error {
  status?: number;
  message?: string;
}

const errorCodes: { [key: string]: string } = {
  P2002: "unique_constraint_error",
  P2007: "validation_error",
};

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    Object.keys(errorCodes).includes(err.code)
  ) {
    return res.json({
      code: errorCodes[err.code],
      payload: err.meta?.target,
    });
  }
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
