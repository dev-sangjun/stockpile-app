import { Router } from "express";
import authRouter from "./auth.routes";
import investmentRouter from "./investment.routes";
import portfolioRouter from "./portfolio.routes";
import stockRouter from "./stock.routes";
import userRouter from "./user.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

const rootRouter = Router();
rootRouter.use("/auth", authRouter);
rootRouter.use("/investments", authMiddleware, investmentRouter);
rootRouter.use("/portfolios", authMiddleware, portfolioRouter);
rootRouter.use("/stocks", authMiddleware, stockRouter);
rootRouter.use("/me", authMiddleware, userRouter);

export default rootRouter;
