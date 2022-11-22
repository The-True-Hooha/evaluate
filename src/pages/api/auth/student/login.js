import bcrypt from "bcrypt"
import { serialize } from "cookie"
import { prisma } from "../../../../config/prisma.connect"
import { createAccessToken } from "../../../../lib/auth"
import { userLoginValidation } from "../../../../lib/validate"

export default async function handler(req, res) {
    console.log(req.body)
    const error = userLoginValidation(req.body)
    if (error) return res.status(400).send(error)

    const { email, password } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (user) {
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(401).json({
                message: "incorrect email or password",
            })
        } else {
            const atCookie = serialize("evaluate", createAccessToken(user), {
                httpOnly: false,
                sameSite: "strict",
                secure: process.env.PHASE,
                maxAge: 60 * 60 * 24 * 7, // expires in 1 week
                path: "/",
            })

            res.setHeader("Set-Cookie", atCookie)
            return res.status(201).json({
                message: "login successful",
                user: user,
            })
        }
    } else {
        return res.status(404).json({
            message: "account does not exist",
        })
    }
}