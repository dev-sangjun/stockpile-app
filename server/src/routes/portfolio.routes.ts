import { Router } from "express";
import { portfolioController } from "../controllers";

const portfolioRouter = Router();
portfolioRouter.get("/", portfolioController.getPortfolios);
portfolioRouter.post("/", portfolioController.createPortfolio);
portfolioRouter.post(
  "/:portfolioId/investments",
  portfolioController.addInvestmentToPortfolio
);
portfolioRouter.delete(
  "/:portfolioId/investments/:investmentId",
  portfolioController.deleteInvestment
);

export default portfolioRouter;
