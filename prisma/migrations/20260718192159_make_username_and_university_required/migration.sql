/*
  Warnings:

  - A unique constraint covering the columns `[university_id,username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `university_id` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_university_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "university_id" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_university_id_username_key" ON "users"("university_id", "username");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
