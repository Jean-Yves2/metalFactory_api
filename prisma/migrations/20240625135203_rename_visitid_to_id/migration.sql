/*
  Warnings:

  - The primary key for the `WebAnalytics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `visitId` on the `WebAnalytics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WebAnalytics" DROP CONSTRAINT "WebAnalytics_pkey",
DROP COLUMN "visitId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "WebAnalytics_pkey" PRIMARY KEY ("id");
