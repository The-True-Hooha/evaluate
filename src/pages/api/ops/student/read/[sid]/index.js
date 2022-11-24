import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import prismaErrorWrapper from "../../../../../../lib/prismaErrorWrapper"

export default async function (req, res) {
    const { sid } = req.query
    return prismaErrorWrapper(res, async () => {
        return await prisma.student.update({
            where: {
                sid: sid,
            },
            data : {
                course : {
                    connect : {
                        coursename : "Machine Learning v2881"
                    }
                }
            }
            // include: {
            //     codingActivity: true,
            //     course: true,
            //     learningobjectives: true,
            // },
        })
    })
}
