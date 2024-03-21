-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "WebAnalytics" ADD COLUMN     "deleted_at" TIMESTAMP(3);
