-- CreateTable
CREATE TABLE `SystemStat` (
    `id` VARCHAR(191) NOT NULL,
    `system_id` VARCHAR(191) NOT NULL,
    `stat_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SystemStat` ADD CONSTRAINT `SystemStat_system_id_fkey` FOREIGN KEY (`system_id`) REFERENCES `System`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SystemStat` ADD CONSTRAINT `SystemStat_stat_id_fkey` FOREIGN KEY (`stat_id`) REFERENCES `Stat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
