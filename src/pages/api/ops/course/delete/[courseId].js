import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"

export default function (req, res) {
    const { courseId } = req.query

    return prismaErrorWrapper(res, async () => {
        return await prisma.course.delete({
            where: {
                courseId: courseId,
            },
        })
    })
}
