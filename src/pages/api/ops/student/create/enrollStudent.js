import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"

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
