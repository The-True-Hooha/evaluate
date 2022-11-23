import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"

export default async function (req, res) {
    const { courseId } = req.query

    return prismaErrorWrapper(res, async () => {
        return await prisma.course.findUnique({
            where: {
                courseId: courseId,
            },
            include: {
                LearningObjective: true,
                faculty: true,
                activity: {
                    include: {
                        codingActivity: true,
                    },
                },
            },
        })
    })
}