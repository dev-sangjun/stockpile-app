import express from "express";
import dotenv from "dotenv";
import { authRouter, stockRouter } from "./routes";
import { errorHandler } from "./utils/errorHandler";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/stocks", stockRouter);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running at ${PORT}...`));
