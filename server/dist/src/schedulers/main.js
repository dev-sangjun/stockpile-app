"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const resync_stocks_scheduler_1 = __importDefault(require("./resync-stocks.scheduler"));
const update_user_net_worth_scheduler_1 = __importDefault(require("./update-user-net-worth.scheduler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const SCHEDULER_PORT = process.env.SCHEDULER_PORT || 8080;
app.listen(SCHEDULER_PORT, () => {
    // resync stocks every 10 minutes
    node_schedule_1.default.scheduleJob("* * * * *", resync_stocks_scheduler_1.default);
    // update user net worth every 5 days at 21:00 UTC (17:00 EST)
    node_schedule_1.default.scheduleJob("0 21 * * 1-5", update_user_net_worth_scheduler_1.default);
});
