import express from "express";
import dotenv from "dotenv";
import schedule from "node-schedule";
import resyncStocks from "./resync-stocks.scheduler";
import updateUserNetWorth from "./update-user-net-worth.scheduler";

dotenv.config();

const app = express();
const SCHEDULER_PORT = process.env.SCHEDULER_PORT || 8080;
app.listen(SCHEDULER_PORT, () => {
  // resync stocks every 10 minutes
  schedule.scheduleJob("* * * * *", resyncStocks);
  // update user net worth every 5 days at 21:00 UTC (17:00 EST)
  schedule.scheduleJob("0 21 * * 1-5", updateUserNetWorth);
});
