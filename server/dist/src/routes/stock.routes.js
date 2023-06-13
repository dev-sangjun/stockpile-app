"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const stockRouter = (0, express_1.Router)();
stockRouter.get("/search", controllers_1.stockController.getStockSymbols);
stockRouter.get("/symbols", controllers_1.stockController.getAllStockSymbols);
stockRouter.get("/:q", controllers_1.stockController.getStock);
exports.default = stockRouter;
