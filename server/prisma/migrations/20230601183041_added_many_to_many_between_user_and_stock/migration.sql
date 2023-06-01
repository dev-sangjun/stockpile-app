-- CreateTable
CREATE TABLE "_StockToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StockToUser_AB_unique" ON "_StockToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_StockToUser_B_index" ON "_StockToUser"("B");

-- AddForeignKey
ALTER TABLE "_StockToUser" ADD CONSTRAINT "_StockToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Stock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockToUser" ADD CONSTRAINT "_StockToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
