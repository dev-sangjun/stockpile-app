import express from "express";
import dotenv from "dotenv";
import schedule from "node-schedule";
import resyncStocks from "./resync-stocks.scheduler";

dotenv.config();

const app = express();
const SCHEDULER_PORT = process.env.SCHEDULER_PORT || 8080;
app.listen(SCHEDULER_PORT, () => {
  // resync stocks every 10 minutes
  schedule.scheduleJob("*/5 * * * *", resyncStocks);
});
