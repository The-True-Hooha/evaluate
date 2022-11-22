import { sign } from "jsonwebtoken"

export const createAccessToken = (user) => {
    return sign(
        { email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_REFRESH_TIME,
        }
    )
}
