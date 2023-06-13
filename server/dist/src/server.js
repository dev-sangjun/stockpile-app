"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./utils/errorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
const whitelist = [process.env.ALLOWED_ORIGIN || "http://localhost:5173"];
const corsOptions = {
    credentials: true,
    origin: whitelist,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api", routes_1.default);
app.use(errorHandler_1.errorHandler);
app.use(express_1.default.static(path_1.default.join(__dirname, "../dist")));
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "/", "index.html"));
});
app.listen(PORT, () => console.log(`Server running at ${PORT}...`));
