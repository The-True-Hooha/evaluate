import { prisma } from "../../../config/prisma.connect"
import { verify } from "jsonwebtoken"

export default async function me(req, res) {
    const { cookies } = req

    const authorization = cookies.evaluate
    if (!authorization) return res.status(403).json("Not Authenticated")

    try {
        const payload = verify(
            authorization,
            "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2NzMwMjc4OCwiaWF0IjoxNjY3MzAyNzg4fQ.R1hbt4mebhB_t2a3xvDBdhAb6aO4qniRxIop4-vJkRA"
        )

        const { role, id } = payload
        if (role === "STUDENT") {
            const student = await prisma.student.findUnique({
                where: {
                    sid: id,
                },
            })

            return res.status(201).json(student)
        }
        if (role === "FACULTY") {
            const faculty = await prisma.faculty.findUnique({
                where: {
                    fid: id,
                },
            })

            return res.status(201).json(faculty)
        }
    } catch (err) {
        return res.status(404).json("Not Authenticated...")
    }
}
