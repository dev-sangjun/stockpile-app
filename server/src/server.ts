import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  authRouter,
  investmentRouter,
  portfolioRouter,
  stockRouter,
  userRouter,
} from "./routes";
import { errorHandler } from "./utils/errorHandler";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/investments", investmentRouter);
app.use("/portfolios", portfolioRouter);
app.use("/stocks", stockRouter);
app.use("/users", userRouter);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running at ${PORT}...`));
