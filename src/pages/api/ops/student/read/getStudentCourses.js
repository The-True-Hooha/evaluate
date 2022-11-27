import { prisma } from "../../../../../config/prisma.connect"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"

export default async function (req, res) {
    const { sid } = req.body
    return prismaErrorWrapper(res, async () => {
        return await prisma.student.findUnique({
            where: {
                sid: sid,
            },
            select: {
                courses: true,
            },
        })
    })
}
