-- AlterTable
ALTER TABLE "email_verification_codes" ADD COLUMN     "window_started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
