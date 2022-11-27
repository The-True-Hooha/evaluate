import { prisma } from "../../../../../config/prisma.connect"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"

export default function (req, res) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.activity.deleteMany({})
    })
}
