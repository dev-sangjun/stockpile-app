"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const resync_stocks_scheduler_1 = __importDefault(require("./schedulers/resync-stocks.scheduler"));
const errorHandler_1 = require("./utils/errorHandler");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
const whitelist = [process.env.ALLOWED_ORIGIN || 'http://localhost:5173'];
const corsOptions = {
    credentials: true, // This is important.
    origin: whitelist,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api', routes_1.default);
app.use(errorHandler_1.errorHandler);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../')));
    app.get('/*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../', 'index.html'));
    });
}
app.listen(PORT, () => console.log(`Server running at ${PORT}...`));
const SCHEDULER_PORT = process.env.SCHEDULER_PORT || 8080;
app.listen(SCHEDULER_PORT, () => {
    // resync stocks every minute from 12 - 21 UTC M-F
    node_schedule_1.default.scheduleJob('* 12-21 * * 1-5', resync_stocks_scheduler_1.default);
});
