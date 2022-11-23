import { PrismaClient } from "@prisma/client"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"
const prisma = new PrismaClient()

export default async function (req, res) {
    const { userId } = req.body
    return prismaErrorWrapper(res, async () => {
        return await prisma.user.findUnique({
            where: {
                userId: userId,
            },
            select: {
                course: true,
            },
        })
    })
}
