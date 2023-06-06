/*
  Warnings:

  - You are about to drop the column `favorites` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favorites",
ADD COLUMN     "favoritePortfolios" TEXT[],
ADD COLUMN     "favoriteStocks" TEXT[];
