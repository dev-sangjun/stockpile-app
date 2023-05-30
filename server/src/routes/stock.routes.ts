import { Router } from "express";
import { stockController } from "../controllers";

const stockRouter = Router();
stockRouter.get("/:q", stockController.getStock);

export default stockRouter;
