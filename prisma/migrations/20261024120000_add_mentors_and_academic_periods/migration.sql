-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('USER', 'MENTOR_ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "user_role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "is_leveling" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "academic_periods" (
    "id" SERIAL NOT NULL,
    "year" SMALLINT NOT NULL,
    "term" SMALLINT NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3) NOT NULL,
    "achievement_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "academic_periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentor_assignments" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "period_id" INTEGER NOT NULL,
    "added_by_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mentor_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "academic_periods_achievement_id_key" ON "academic_periods"("achievement_id");

-- CreateIndex
CREATE UNIQUE INDEX "academic_periods_year_term_key" ON "academic_periods"("year", "term");

-- CreateIndex
CREATE INDEX "mentor_assignments_period_id_idx" ON "mentor_assignments"("period_id");

-- CreateIndex
CREATE UNIQUE INDEX "mentor_assignments_email_period_id_key" ON "mentor_assignments"("email", "period_id");

-- AddForeignKey
ALTER TABLE "academic_periods" ADD CONSTRAINT "academic_periods_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "achievements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_assignments" ADD CONSTRAINT "mentor_assignments_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "academic_periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentor_assignments" ADD CONSTRAINT "mentor_assignments_added_by_id_fkey" FOREIGN KEY ("added_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;


-- Data: marcar los cursos de nivelación. Son los mismos IDs fijos que usan
-- src/app/home/page.tsx y src/app/home/myprofile/page.tsx.
UPDATE "courses" SET "is_leveling" = true WHERE "id" IN (17, 18, 19, 20);

-- Los logros existentes se insertaron con IDs explícitos (el código los
-- referencia como 2–7, 12…), así que la secuencia puede haber quedado por
-- detrás de MAX(id). El primer logro "Mentor <periodo>" se crea con
-- autoincrement y chocaría con la PK; se resincroniza aquí.
SELECT setval(
  pg_get_serial_sequence('"achievements"', 'id'),
  (SELECT COALESCE(MAX("id"), 0) + 1 FROM "achievements"),
  false
);
