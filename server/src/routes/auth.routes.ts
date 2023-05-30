import { Router } from "express";
import { AuthController } from "../controllers";

const authRouter = Router();
authRouter.post("/signup", AuthController.createUser);

export default authRouter;
