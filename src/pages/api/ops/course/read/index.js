import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { prisma } from "@config/prisma.connect"

export default async function getAll(req, res) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.course.findMany({
            include: {
                students: {
                    select: {
                        email: true,
                    },
                },
                learningObjectives: {
                    select: {
                        description: true,
                    },
                },
                instructor: {
                    select: {
                        firstName: true,
                    },
                },
                activities: {
                    select: {
                        topic: true,
                    },
                },
            },
        })
    })
}
