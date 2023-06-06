/*
  Warnings:

  - You are about to drop the column `netWorths` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "netWorths",
ADD COLUMN     "favorites" TEXT[];
