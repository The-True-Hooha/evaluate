// import { prisma } from "../../../../config/prisma.connect"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function create(req, res) {
    const {
        topic,
        points,
        numofattempts,
        availablefrom,
        availableto,
        courseId,
        codingActivity: { question },
        learningObjectives: { description },
    } = req.body

    return prismaErrorWrapper(res, async () => {
        return await prisma.activity.create({
            data: {
                topic: topic,
                points: points,
                numofattempts: numofattempts,
                availablefrom: new Date().toISOString(),
                availableto: new Date().toISOString(),
                course: {
                    connect: {
                        coursename: "Machine Learning v2801", //replace with courseId
                    },
                },
                learningobjectives: {
                    create: {
                        description : description
                    },
                },
                codingActivity: {
                    create: {
                        question: question,
                    },
                },
            },
        })
    })
}
