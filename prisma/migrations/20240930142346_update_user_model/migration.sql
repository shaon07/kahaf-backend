/*
  Warnings:

  - You are about to drop the column `addressId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nameId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserName` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_nameId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `addressId`,
    DROP COLUMN `nameId`,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `street` VARCHAR(191) NOT NULL,
    ADD COLUMN `zipCode` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Address`;

-- DropTable
DROP TABLE `UserName`;

-- CreateIndex
CREATE INDEX `User_email_username_idx` ON `User`(`email`, `username`);
