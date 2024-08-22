/*
  Warnings:

  - You are about to drop the column `sessionID` on the `WebAnalytics` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WebAnalytics` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WebAnalytics" DROP CONSTRAINT "WebAnalytics_userId_fkey";

-- AlterTable
ALTER TABLE "WebAnalytics" DROP COLUMN "sessionID",
DROP COLUMN "userId";
