import { genSalt, hash } from "bcrypt"

export default async function hashPassword(password) {
    const generateHash = await genSalt(Number(process.env.SALT))
    const hashedPassword = await hash(password, generateHash)

    return hashedPassword
}
