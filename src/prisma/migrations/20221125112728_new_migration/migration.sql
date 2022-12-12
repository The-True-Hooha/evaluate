/*
  Warnings:

  - You are about to drop the column `testCases` on the `activity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accessCode]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `language` to the `CodingActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testCases` to the `CodingActivity` table without a default value. This is not possible if the table is not empty.
  - The required column `accessCode` was added to the `Course` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `activity` DROP COLUMN `testCases`;

-- AlterTable
ALTER TABLE `codingactivity` ADD COLUMN `language` ENUM('JAVA', 'PYTHON') NOT NULL,
    ADD COLUMN `testCases` JSON NOT NULL;

-- AlterTable
ALTER TABLE `course` ADD COLUMN `accessCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Course_accessCode_key` ON `Course`(`accessCode`);
