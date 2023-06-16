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
portfolioRouter.delete("/:portfolioId", portfolioController.deletePortfolio);
portfolioRouter.patch("/:portfolioId", portfolioController.updatePortfolio);

export default portfolioRouter;
