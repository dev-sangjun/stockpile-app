import { Router } from "express";
import { portfolioController } from "../controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const portfolioRouter = Router();
portfolioRouter.use(authMiddleware);
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
portfolioRouter.delete("/:portfolioId/", portfolioController.deletePortfolio);

export default portfolioRouter;
