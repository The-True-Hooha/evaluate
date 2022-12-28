import { prisma } from "@config/prisma.connect"
import bcrypt from "bcrypt"
import { createAccessToken } from "@lib/auth"
import { serialize } from "cookie"
import { facultyLoginValidation } from "@lib/validate"


export default async function handler (req, res){
    const loginError = facultyLoginValidation(req.body)
    if(loginError) return res.status(400).send(loginError)

    const { facultyId, password} = req.body

    const faculty = await prisma.faculty.findUnique({
        where: {
            facultyId: facultyId,
        }
    })

    if(faculty){
        const checkFacultyPassword = await bcrypt.compare(password, faculty.password)
        if(!checkFacultyPassword){
            return res.status(401).json({
                message: "incorrect email or password",
            })
        } else {
            const serialized = serialize(
                "evaluate",
                createAccessToken(faculty.fid, faculty.role),
                {
                    httpOnly: false,
                    secure: process.env.PHASE,
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 7, // 1 week duration
                    path: "/"
                }
            )

            res.setHeader("Set-Cookie", serialized)
            return res.status(202).json({
                message: "login successful",
                user: faculty
            })
        }
    }else{
        return res.status(404).json({
            message: "account does not exist"
        })
    }
}