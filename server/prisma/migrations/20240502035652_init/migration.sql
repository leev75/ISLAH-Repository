-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumber` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `nbr_Of_reports` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    UNIQUE INDEX `User_password_key`(`password`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Manager` (
    `key` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `categorie` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Manager_key_key`(`key`),
    UNIQUE INDEX `Manager_categorie_key`(`categorie`),
    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Raport` (
    `report_id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(100) NOT NULL,
    `image` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `categorie` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Reported',
    `nbr_Of_Votes` INTEGER NOT NULL DEFAULT 0,
    `edited` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`report_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote` (
    `vote_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reportId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Vote_vote_id_key`(`vote_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Raport` ADD CONSTRAINT `Raport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Raport` ADD CONSTRAINT `Raport_categorie_fkey` FOREIGN KEY (`categorie`) REFERENCES `Manager`(`categorie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_reportId_fkey` FOREIGN KEY (`reportId`) REFERENCES `Raport`(`report_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
