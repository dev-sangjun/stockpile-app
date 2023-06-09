import { Router } from "express";
import { authController } from "../controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();
authRouter.post("/signup", authController.signUpUser);
authRouter.post("/signin", authController.signInUser);
authRouter.get("/signout", authMiddleware, authController.signOutUser);

export default authRouter;
