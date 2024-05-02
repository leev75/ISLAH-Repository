/*
  Warnings:

  - You are about to drop the column `nbr_Of_reports` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `nbr_Of_reports`,
    ADD COLUMN `nbr_of_reports` INTEGER NOT NULL DEFAULT 0;
