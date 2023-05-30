import { Router } from "express";
import { AuthController } from "../controllers";

const authRouter = Router();
authRouter.post("/signup", AuthController.signUpUser);
authRouter.post("/signin", AuthController.signInUser);

export default authRouter;
