import { prisma } from "../../../../../config/prisma.connect"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"

export default async function (req, res) {
    const { activityId } = req.query
    return prismaErrorWrapper(res, async () => {
        return await prisma.activity.delete({
            where: {
                activityId: activityId,
            },
            include: {
                codingActivity: true,
                course: true,
                learningObjectives: true,
            },
        })
    })
}
