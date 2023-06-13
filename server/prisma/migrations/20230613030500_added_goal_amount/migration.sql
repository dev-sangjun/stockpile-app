/*
  Warnings:

  - You are about to drop the column `favoritePortfolios` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favoritePortfolios",
ADD COLUMN     "goalAmount" DOUBLE PRECISION NOT NULL DEFAULT 100000;
