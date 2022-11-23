import { PrismaClient } from "@prisma/client"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"
const prisma = new PrismaClient()

export default async function (req, res) {
    const { sid } = req.body
    return prismaErrorWrapper(res, async () => {
        return await prisma.student.findUnique({
            where: {
                sid: sid,
            },
            select: {
                course: true,
            },
        })
    })
}
