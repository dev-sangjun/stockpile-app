import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rootRouter from "./routes";
import { errorHandler } from "./utils/errorHandler";
import cookieParser from "cookie-parser";

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
app.listen(PORT, () => console.log(`Server running at ${PORT}...`));
