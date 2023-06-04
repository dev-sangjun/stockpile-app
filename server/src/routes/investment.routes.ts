import { Router } from "express";
import { investmentController } from "../controllers";

const investmentRouter = Router();
investmentRouter.get("/", investmentController.getInvestments);

export default investmentRouter;
