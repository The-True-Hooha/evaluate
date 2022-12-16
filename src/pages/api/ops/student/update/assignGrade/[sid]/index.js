import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"

export default async function (req, res) {
    const { sid } = req.query
    const { codingActivityId, sourceCode, score } = req.body

    return prismaErrorWrapper(res, async () => {
        return await prisma.submission.create({
            data: {
                studentid: sid,
                codingActivityId: codingActivityId,
                sourceCode: sourceCode,
                score: score,
            },
        })
    })
}
