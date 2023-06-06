import { Router } from "express";
import authRouter from "./auth.routes";
import investmentRouter from "./investment.routes";
import portfolioRouter from "./portfolio.routes";
import stockRouter from "./stock.routes";
import userRouter from "./user.routes";

const rootRouter = Router();
rootRouter.use("/auth", authRouter);
rootRouter.use("/investments", investmentRouter);
rootRouter.use("/portfolios", portfolioRouter);
rootRouter.use("/stocks", stockRouter);
rootRouter.use("/users", userRouter);

export default rootRouter;
