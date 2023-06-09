import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthorizedRequest extends Request {
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
