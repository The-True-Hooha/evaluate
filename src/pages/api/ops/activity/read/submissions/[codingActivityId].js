import { prisma } from "../../../../../../config/prisma.connect"
// import { prisma, PrismaClient } from "@prisma/client"
// const prisma = new PrismaClient()
import prismaErrorWrapper from "../../../../../../lib/prismaErrorWrapper"

export default async function (req, res) {
    const { codingActivityId } = req.query

    return prismaErrorWrapper(res, async () => {
        return await prisma.codingActivity.findUnique({
            where: {
                codingactivityId: codingActivityId,
            },
            select : {
                submissions : true
            }
        })
    })
}
