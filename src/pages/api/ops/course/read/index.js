// import { prisma } from "../../../../config/prisma.connect"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function getAll(req, res) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.course.findMany({
            include: {
                LearningObjective: true,
                faculty: true,
                activity: {
                    include: {
                        codingActivity: true,
                    },
                },
            },
        })
    })
}
