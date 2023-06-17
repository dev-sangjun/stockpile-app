/*
  Warnings:

  - You are about to alter the column `quantity` on the `Investment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `avgCost` on the `Investment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Investment" ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "avgCost" SET DATA TYPE DECIMAL(10,2);
