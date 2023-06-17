import { Router } from "express";
import { investmentController } from "../controllers";

const investmentRouter = Router();
investmentRouter.get("/", investmentController.getInvestments);
investmentRouter.patch("/:investmentId", investmentController.updateInvestment);

export default investmentRouter;
