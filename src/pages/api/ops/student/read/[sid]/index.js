import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import prismaErrorWrapper from "../../../../../../lib/prismaErrorWrapper"

export default async function (req, res) {
    const { sid } = req.query
    return prismaErrorWrapper(res, async () => {
        return await prisma.student.findUnique({
            where: {
                sid: sid,
            },
            include: {
                courses: true,
                submissions: true,
            },
        })
    })
}
