import { Router } from "express";
import { authController } from "../controllers";

const authRouter = Router();
authRouter.post("/signup", authController.signUpUser);
authRouter.post("/signin", authController.signInUser);

export default authRouter;
