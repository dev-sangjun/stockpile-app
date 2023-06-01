/*
  Warnings:

  - You are about to drop the `_StockToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StockToUser" DROP CONSTRAINT "_StockToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_StockToUser" DROP CONSTRAINT "_StockToUser_B_fkey";

-- DropTable
DROP TABLE "_StockToUser";
