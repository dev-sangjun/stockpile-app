import { PrismaClient } from "@prisma/client";

class DBClient {
  private static instance: DBClient;
  client: PrismaClient;
  private constructor() {
    this.client = new PrismaClient();
  }

  static getInstance() {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  }
}

export default DBClient.getInstance().client;
