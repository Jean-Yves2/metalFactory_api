/*
  Warnings:

  - You are about to drop the column `productId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Favorite` table. All the data in the column will be lost.
  - You are about to alter the column `basePrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `unitPriceExclTax` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `VATRate` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `marginPercent` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `sellingPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `linearWeight` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - A unique constraint covering the columns `[cartId,productCode]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,productCode]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productCode]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_productId_fkey";

-- DropIndex
DROP INDEX "CartItem_cartId_productId_key";

-- DropIndex
DROP INDEX "Favorite_userId_productId_key";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "productId",
ADD COLUMN     "productCode" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "productId",
ADD COLUMN     "productCode" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "circumference" DOUBLE PRECISION,
ADD COLUMN     "diameter" DOUBLE PRECISION,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "matiere" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "productCode" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sectionArea" DOUBLE PRECISION,
ADD COLUMN     "thickness" DOUBLE PRECISION,
ADD COLUMN     "weight" DOUBLE PRECISION,
ADD COLUMN     "width" DOUBLE PRECISION,
ALTER COLUMN "basePrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "unitPriceExclTax" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "VATRate" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "marginPercent" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "sellingPrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "linearWeight" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productCode_key" ON "CartItem"("cartId", "productCode");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_productCode_key" ON "Favorite"("userId", "productCode");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productCode_key" ON "Product"("productCode");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productCode_fkey" FOREIGN KEY ("productCode") REFERENCES "Product"("productCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_productCode_fkey" FOREIGN KEY ("productCode") REFERENCES "Product"("productCode") ON DELETE RESTRICT ON UPDATE CASCADE;
