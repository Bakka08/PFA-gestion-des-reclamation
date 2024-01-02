-- DropIndex
DROP INDEX `Reclamation_userId_fkey` ON `reclamation`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Reclamation` ADD CONSTRAINT `Reclamation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
