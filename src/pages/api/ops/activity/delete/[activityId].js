import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
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
                learningobjectives: true,
            },
        })
    })
}
