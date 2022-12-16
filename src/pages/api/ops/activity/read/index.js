import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"

export default async function (req, res) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.activity.findMany({
            include: {
                course: true,
                codingActivity: true,
                learningObjectives: true,
            },
        })
    })
}
