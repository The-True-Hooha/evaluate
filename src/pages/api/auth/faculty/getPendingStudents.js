import { prisma } from "@config/prisma.connect"

export default async function getPendingStudents(req, res) {
    try {
        const getAll = await prisma.student.findMany({
            where: {
                isEnabled: false,
            },

            orderBy: {
                createdAt: "asc", //Date and time
            },
        })
        if (getAll) {
            res.status(200).json({
                message: "returned all students awaiting access",
                data: getAll.map((v) => ({
                    username: v.username,
                    email: v.email,
                })),
            })
        }
    } catch (error) {
        res.status(404).json({
            message: `invalid request ${error}`,
        })
    }
}
