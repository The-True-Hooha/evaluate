import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"

export default async function (req, res) {
    const { activityId } = req.query

    return prismaErrorWrapper(res, async () => {
        return await prisma.activity.findUnique({
            where: {
                activityId: activityId,
            },
            include: {
                learningObjectives: true,
                codingActivity: {
                    select: {
                        codingactivityId: true,
                        question: true,
                        language: true,
                        skeletonCode: true,
                        submissions: true,
                    },
                },
            },
        })
    })
}
