"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const investmentRouter = (0, express_1.Router)();
investmentRouter.get("/", controllers_1.investmentController.getInvestments);
exports.default = investmentRouter;
