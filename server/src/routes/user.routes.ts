import { Router } from "express";
import { userController } from "../controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = Router();
userRouter.use(authMiddleware);
userRouter.get("/:userId", userController.getUser);
userRouter.get("/:userId/stocks", userController.getStocks);
userRouter.get("/:userId/investments", userController.getInvestments);
userRouter.post("/:userId/favorites", userController.addToFavorites);
userRouter.delete("/:userId/favorites", userController.deleteFromFavorites);

export default userRouter;
