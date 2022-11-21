import prisma from "../../config/prisma.connect"
import { verify } from "jsonwebtoken"

export default async function me(req, res) {
    const { headers } = req
    const authorization = headers["authorization"].split(" ")[1]
    if (!authorization) return res.status(403).json("Not Authenticated--")

    try {
        const payload = verify(authorization, process.env.ACCESS_TOKEN_SECRET)
        return await prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        })
    } catch (err) {
        return res.status(404).json("Not Authenticated...")
    }
}
