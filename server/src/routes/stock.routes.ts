import { Router } from "express";
import { stockController } from "../controllers";

const stockRouter = Router();
stockRouter.get("/search", stockController.getStockSymbols);
stockRouter.get("/:q", stockController.getStock);

export default stockRouter;
