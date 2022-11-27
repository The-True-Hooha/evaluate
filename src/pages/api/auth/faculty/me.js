import { prisma } from "../../../../config/prisma.connect"
import { verify } from "jsonwebtoken"

export default async function me(req, res) {
    const { cookies } = req

    const authorization = cookies.evaluate
    if (!authorization) return res.status(403).json("Not Authenticated")

    try {
        const payload = verify(authorization, process.env.ACCESS_TOKEN_SECRET)
        const faculty = await prisma.faculty.findUnique({
            where: {
                email: payload.email,
            },
        })

        return res.status(201).json(faculty)
    } catch (err) {
        return res.status(404).json("Not Authenticated...")
    }
}
