import { PrismaClient } from "@prisma/client"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"
const prisma = new PrismaClient()

export default async function (req, res) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.user.findMany({
            include: {
                course: true,
                submission: true,
            },
        })
    })
}
