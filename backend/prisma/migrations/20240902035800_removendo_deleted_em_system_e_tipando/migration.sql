/*
  Warnings:

  - You are about to alter the column `name` on the `Stat` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to drop the column `deletedAt` on the `System` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `System` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `version` on the `System` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - A unique constraint covering the columns `[name]` on the table `System` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Stat` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `System` DROP COLUMN `deletedAt`,
    MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `version` VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `System_name_key` ON `System`(`name`);
