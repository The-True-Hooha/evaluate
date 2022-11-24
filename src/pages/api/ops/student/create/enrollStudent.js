import { PrismaClient } from "@prisma/client"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"
const prisma = new PrismaClient()

export default function enroll(req, res) {
    const { sid, courseId } = req.body
    return prismaErrorWrapper(res, async () => {
        return prisma.student.update({
            where: {
                sid: sid,
            },
            data: {
                courses: {
                    connect: {
                        courseId: courseId,
                    },
                },
            },
        })
    })
}
