import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as core from "express-serve-static-core";

export interface AuthorizedRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  authorizedUserId: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.access_token;
  if (!token) return res.sendStatus(401); // not authorized
  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
    const payload = jwt.verify(token, JWT_SECRET_KEY) as { userId: string };
    (req as AuthorizedRequest).authorizedUserId = payload.userId;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401);
  }
};
