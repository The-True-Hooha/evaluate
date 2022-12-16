-- CreateTable
CREATE TABLE `Student` (
    `sid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('STUDENT', 'FACULTY') NOT NULL DEFAULT 'STUDENT',
    `isEnabled` BOOLEAN NOT NULL DEFAULT false,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Student_email_key`(`email`),
    UNIQUE INDEX `Student_username_key`(`username`),
    INDEX `Student_sid_idx`(`sid`),
    PRIMARY KEY (`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculty` (
    `fid` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `role` ENUM('STUDENT', 'FACULTY') NOT NULL DEFAULT 'FACULTY',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `password` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `faculty_facultyId_key`(`facultyId`),
    INDEX `faculty_fid_idx`(`fid`),
    PRIMARY KEY (`fid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `courseId` VARCHAR(191) NOT NULL,
    `major` VARCHAR(191) NOT NULL DEFAULT 'Computer Science',
    `coursename` VARCHAR(191) NOT NULL,
    `academicyear` VARCHAR(191) NOT NULL,
    `academicterm` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `accessCode` VARCHAR(191) NOT NULL,
    `instructorId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Course_coursename_key`(`coursename`),
    UNIQUE INDEX `Course_accessCode_key`(`accessCode`),
    INDEX `Course_courseId_idx`(`courseId`),
    PRIMARY KEY (`courseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LearningObjective` (
    `learningObjId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NULL,
    `activityId` VARCHAR(191) NULL,

    INDEX `LearningObjective_learningObjId_idx`(`learningObjId`),
    PRIMARY KEY (`learningObjId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `activityId` VARCHAR(191) NOT NULL,
    `topic` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL,
    `numofattempts` INTEGER NOT NULL,
    `availablefrom` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `availableto` DATETIME(3) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Activity_topic_key`(`topic`),
    INDEX `Activity_activityId_idx`(`activityId`),
    PRIMARY KEY (`activityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodingActivity` (
    `codingactivityId` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `language` ENUM('JAVA', 'PYTHON') NOT NULL,
    `activityId` VARCHAR(191) NOT NULL,
    `testCases` VARCHAR(191) NOT NULL,
    `skeletonCode` VARCHAR(1000) NOT NULL,

    UNIQUE INDEX `CodingActivity_question_key`(`question`),
    UNIQUE INDEX `CodingActivity_activityId_key`(`activityId`),
    PRIMARY KEY (`codingactivityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Submission` (
    `submissionId` VARCHAR(191) NOT NULL,
    `sumbittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `score` VARCHAR(5000) NOT NULL,
    `studentid` VARCHAR(191) NOT NULL,
    `sourceCode` VARCHAR(5000) NOT NULL,
    `codingActivityId` VARCHAR(191) NOT NULL,

    INDEX `Submission_submissionId_idx`(`submissionId`),
    PRIMARY KEY (`submissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CourseToStudent` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CourseToStudent_AB_unique`(`A`, `B`),
    INDEX `_CourseToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `faculty`(`fid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningObjective` ADD CONSTRAINT `LearningObjective_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningObjective` ADD CONSTRAINT `LearningObjective_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`activityId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CodingActivity` ADD CONSTRAINT `CodingActivity_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`activityId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `Student`(`sid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_codingActivityId_fkey` FOREIGN KEY (`codingActivityId`) REFERENCES `CodingActivity`(`codingactivityId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CourseToStudent` ADD CONSTRAINT `_CourseToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Course`(`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CourseToStudent` ADD CONSTRAINT `_CourseToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`sid`) ON DELETE CASCADE ON UPDATE CASCADE;
