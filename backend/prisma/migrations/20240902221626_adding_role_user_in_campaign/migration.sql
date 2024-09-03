/*
  Warnings:

  - Added the required column `role` to the `UserInCampaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserInCampaign` ADD COLUMN `role` VARCHAR(50) NOT NULL;
