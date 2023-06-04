import { Router } from "express";
import { portfolioController } from "../controllers";

const portfolioRouter = Router();
portfolioRouter.get("/", portfolioController.getPortfolios);
portfolioRouter.post("/", portfolioController.createPortfolio);
portfolioRouter.get(
  "/:portfolioId/investments",
  portfolioController.getInvestments
);
portfolioRouter.post(
  "/:portfolioId/investments",
  portfolioController.addInvestment
);
portfolioRouter.delete(
  "/:portfolioId/investments/:investmentId",
  portfolioController.deleteInvestment
);

export default portfolioRouter;
