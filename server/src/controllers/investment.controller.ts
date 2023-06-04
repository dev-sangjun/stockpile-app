import { NextFunction, Request, Response } from "express";
import { investmentService } from "../services";

const getInvestments = async (
  req: Request<undefined, any, any, { userId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.query;
  try {
    const investments = await investmentService.getInvestmentsByUserId(userId);
    return res.json(investments);
  } catch (e) {
    return next(e);
  }
};

export default {
  getInvestments,
};
