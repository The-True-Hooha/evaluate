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
                learningObjectives: {
                    select: {
                        description: true,
                    },
                },
                instructor: {
                    select: {
                        firstName: true,
                        lastName : true
                    },
                },
                activities: {
                    select: {
                        activityId :true,
                        topic: true,
                        points: true,
                        numofattempts: true,
                        availablefrom: true,
                        availableto: true,
                    },
                },
            },
        })
    })
}
