/*
  Warnings:

  - You are about to alter the column `role` on the `student` table. The data in that column could be lost. The data in that column will be cast from `Enum("student_role")` to `Enum("Student_role")`.

*/
-- AlterTable
ALTER TABLE `faculty` ADD COLUMN `role` ENUM('STUDENT', 'FACULTY') NOT NULL DEFAULT 'FACULTY';

-- AlterTable
ALTER TABLE `student` MODIFY `role` ENUM('STUDENT', 'FACULTY') NOT NULL DEFAULT 'STUDENT';
