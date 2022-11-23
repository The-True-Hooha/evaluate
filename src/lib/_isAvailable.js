import { prisma } from "../config/prisma.connect"

//checks if user credentials can be allocated to others
export default async function _isAvailable(email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (user && user.isVerified) return false
    if (user && !user.isVerified) {
        await prisma.user.delete({
            where: {
                email: email,
            },
        })

        return true
    }

    return !user ? true : false
}
