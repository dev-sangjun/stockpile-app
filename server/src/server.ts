import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import schedule from "node-schedule";
import rootRouter from "./routes";
import { errorHandler } from "./utils/errorHandler";
import resyncStocks from "./schedulers/resync-stocks.scheduler";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const whitelist = [process.env.ALLOWED_ORIGIN || "http://localhost:5173"];
const corsOptions = {
  credentials: true, // This is important.
  origin: whitelist,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api", rootRouter);
app.use(errorHandler);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "index.html"));
  });
}
app.listen(PORT, () => console.log(`Server running at ${PORT}...`));

const SCHEDULER_PORT = process.env.SCHEDULER_PORT || 8080;
app.listen(SCHEDULER_PORT, () => {
  // resync stocks every 5 minutes
  schedule.scheduleJob("*/5 * * * *", resyncStocks);
});
