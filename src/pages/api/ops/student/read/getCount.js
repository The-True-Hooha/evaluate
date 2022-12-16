import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function getStudentCount(req, res){
    return prismaErrorWrapper(res, async () => {
        return await prisma.student.count()
    })
}