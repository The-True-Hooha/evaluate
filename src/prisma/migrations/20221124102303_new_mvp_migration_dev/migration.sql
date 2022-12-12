/*
  Warnings:

  - You are about to drop the column `facultyname` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `faculty` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `sid` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the `_activitytolearningobjective` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[topic]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[question]` on the table `CodingActivity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `testCases` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Made the column `activityId` on table `codingactivity` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `instructorId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentid` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_activitytolearningobjective` DROP FOREIGN KEY `_ActivityToLearningObjective_A_fkey`;

-- DropForeignKey
ALTER TABLE `_activitytolearningobjective` DROP FOREIGN KEY `_ActivityToLearningObjective_B_fkey`;

-- DropForeignKey
ALTER TABLE `codingactivity` DROP FOREIGN KEY `CodingActivity_activityId_fkey`;

-- DropForeignKey
ALTER TABLE `faculty` DROP FOREIGN KEY `faculty_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `submission` DROP FOREIGN KEY `Submission_sid_fkey`;

-- AlterTable
ALTER TABLE `activity` ADD COLUMN `testCases` JSON NOT NULL,
    MODIFY `availablefrom` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `codingactivity` MODIFY `activityId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `facultyname`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `instructorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `faculty` DROP COLUMN `courseId`,
    ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `learningobjective` ADD COLUMN `activityId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `courseId`;

-- AlterTable
ALTER TABLE `submission` DROP COLUMN `sid`,
    ADD COLUMN `score` INTEGER NOT NULL,
    ADD COLUMN `studentid` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_activitytolearningobjective`;

-- CreateTable
CREATE TABLE `_CourseToStudent` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CourseToStudent_AB_unique`(`A`, `B`),
    INDEX `_CourseToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Activity_topic_key` ON `Activity`(`topic`);

-- CreateIndex
CREATE INDEX `Activity_activityId_idx` ON `Activity`(`activityId`);

-- CreateIndex
CREATE UNIQUE INDEX `CodingActivity_question_key` ON `CodingActivity`(`question`);

-- CreateIndex
CREATE INDEX `Course_courseId_idx` ON `Course`(`courseId`);

-- CreateIndex
CREATE INDEX `faculty_fid_idx` ON `faculty`(`fid`);

-- CreateIndex
CREATE INDEX `LearningObjective_learningObjId_idx` ON `LearningObjective`(`learningObjId`);

-- CreateIndex
CREATE INDEX `Student_sid_idx` ON `Student`(`sid`);

-- CreateIndex
CREATE INDEX `Submission_submissionId_idx` ON `Submission`(`submissionId`);

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `faculty`(`fid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningObjective` ADD CONSTRAINT `LearningObjective_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`activityId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CodingActivity` ADD CONSTRAINT `CodingActivity_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`activityId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `Student`(`sid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CourseToStudent` ADD CONSTRAINT `_CourseToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Course`(`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CourseToStudent` ADD CONSTRAINT `_CourseToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`sid`) ON DELETE CASCADE ON UPDATE CASCADE;
