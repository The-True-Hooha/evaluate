import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import prismaErrorWrapper from "../../../../../../lib/prismaErrorWrapper"

export default async function (req, res) {
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    const { sid } = req.query
    const { accessCode } = req.body

    if (!regexExp.test(accessCode)) {
        return res
            .status(400)
            .json("Invalid Access Code, Contact your instructor")
    }
    return prismaErrorWrapper(res, async () => {
        return await prisma.course.update({
            where: {
                accessCode: accessCode,
            },
            data: {
                students: {
                    connect: {
                        sid: sid,
                    },
                },
            },
        })
    })
}
