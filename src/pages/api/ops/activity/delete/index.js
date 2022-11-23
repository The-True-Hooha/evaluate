import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"

export default function (req, res) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.activity.deleteMany({})
    })
}
