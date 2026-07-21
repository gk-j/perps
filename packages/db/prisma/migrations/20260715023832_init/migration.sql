-- AlterTable
ALTER TABLE "Position" ALTER COLUMN "realizedPnl" SET DEFAULT 0;

-- DropEnum
DROP TYPE "LedgerType";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "PaymentType";

-- DropEnum
DROP TYPE "TakerSide";
