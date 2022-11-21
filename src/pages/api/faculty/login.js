import prisma from "../../../config/prisma.connect"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { serialize } from "cookie"
import { facultyLoginValidation } from "../../../lib/validate"

export default async function handler(req, res) {
    const error = facultyLoginValidation(req.body)
    if (error) return res.status(400).send(error)

    const { facultyId, password } = req.body
    const cookie = jwt.sign({ facultyId }, process.env.SECRET, {
        expiresIn: process.env.TIME,
    })

    const admin = await prisma.faculty.findUnique({
        where: {
            facultyId: facultyId,
        },
    })

    if (admin) {
        const checkPassword = await bcrypt.compare(password, admin.password)
        if (!checkPassword) {
            return res.status(401).json({
                message: "incorrect email or password",
            })
        } else {
            const serialized = serialize("evaluate", cookie, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.PHASE,
                maxAge: 60 * 60 * 24 * 7, // expires in 1 week
            })

            res.setHeader("Set-Cookie", serialized)
            return res.status(201).json({
                message: "login successful",
                user: admin,
            })
        }
    } else {
        return res.status(404).json({
            message: "account does not exist",
        })
    }
}
