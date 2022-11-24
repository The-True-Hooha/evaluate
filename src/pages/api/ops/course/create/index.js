import { PrismaClient } from "@prisma/client"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"
const prisma = new PrismaClient()

export default async function createCourse(req, res) {
    const {
        coursename,
        academicyear,
        academicterm,
        learningObjectives,
        facultyId,
    } = req.body

    return prismaErrorWrapper(res, async () => {
        return await prisma.course.create({
            data: {
                coursename: coursename,
                academicyear: academicyear,
                academicterm: academicterm,
                learningObjectives: {
                    create: {
                        description: learningObjectives,
                    },
                },
                instructor: {
                    connect: {
                        facultyId: facultyId,
                    },
                },
            },
        })
    })
}
