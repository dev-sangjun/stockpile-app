import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();
userRouter.get("/", userController.getUser);
userRouter.get("/stocks", userController.getStocks);
userRouter.get("/investments", userController.getInvestments);
userRouter.post("/favorites", userController.addToFavorites);
userRouter.delete("/favorites", userController.deleteFromFavorites);

export default userRouter;
