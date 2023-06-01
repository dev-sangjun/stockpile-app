import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();
userRouter.get("/:userId/stocks", userController.getStocks);

export default userRouter;
