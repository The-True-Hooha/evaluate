import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"

export default async function deleteAll(req, res) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.course.deleteMany({})
    })
}
