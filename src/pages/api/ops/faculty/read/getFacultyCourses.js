import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"

export default function (req, res) {
    const { fid } = req.body

    return prismaErrorWrapper(res, async () => {
        return await prisma.faculty.findUnique({
            where: {
                fid: fid,
            },
            select: {
                courses: true,
            },
        })
    })
}
