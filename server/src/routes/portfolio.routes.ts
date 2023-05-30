import { Router } from "express";
import { portfolioController } from "../controllers";

const portfolioRouter = Router();
portfolioRouter.get("/", portfolioController.getPortfolios);

export default portfolioRouter;
