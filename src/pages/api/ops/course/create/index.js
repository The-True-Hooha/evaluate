import { PrismaClient } from "@prisma/client"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"
const prisma = new PrismaClient()

export default async function create(req, res) {
    const {
        facultyname,
        coursename,
        academicyear,
        academicterm,
        learningObjectives,
        facultyId,
    } = req.body

    return prismaErrorWrapper(res, async () => {
        const users = await prisma.user.findMany({})

        return await prisma.course.create({
            data: {
                facultyname: facultyname,
                coursename: coursename,
                academicyear: academicyear,
                academicterm: academicterm,
                LearningObjective: {
                    create: {
                        description: learningObjectives,
                    },
                },
                faculty: {
                    connect: {
                        facultyId: facultyId,
                    },
                },
                User: {
                    connect: {
                        userId: "5f6bdd1c-39f5-475c-88ba-c8ceee10fe42",
                    },
                },
            },
        })
    })
}
