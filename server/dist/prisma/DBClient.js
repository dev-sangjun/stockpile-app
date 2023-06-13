"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class DBClient {
    constructor() {
        this.client = new client_1.PrismaClient();
    }
    static getInstance() {
        if (!DBClient.instance) {
            DBClient.instance = new DBClient();
        }
        return DBClient.instance;
    }
}
exports.default = DBClient.getInstance().client;
