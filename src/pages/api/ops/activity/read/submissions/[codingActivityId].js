import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"

export default async function (req, res) {
    const { codingActivityId } = req.query

    return prismaErrorWrapper(res, async () => {
        return await prisma.codingActivity.findUnique({
            where: {
                codingactivityId: codingActivityId,
            },
            select: {
                question: true,
                submissions: {
                    include: {
                        student: {
                            select: {
                                email: true,
                                username: true,
                            },
                        },
                    },
                },
            },
        })
    })
}
