-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ipo" TIMESTAMP(3) NOT NULL,
    "logo" TEXT NOT NULL,
    "stockId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_stockId_key" ON "Company"("stockId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
