import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import rootRouter from "./routes";
import { errorHandler } from "./utils/errorHandler";
import cookieParser from "cookie-parser";
import path from "path";

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
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
app.use("/api", rootRouter);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, "../dist/client")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});
app.listen(PORT, () => console.log(`Server running at ${PORT}...`));
