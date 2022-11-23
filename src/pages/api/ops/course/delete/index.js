import { PrismaClient } from "@prisma/client"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"
const prisma = new PrismaClient()

export default async function deleteAll(req, res) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.course.deleteMany({})
    })
}
