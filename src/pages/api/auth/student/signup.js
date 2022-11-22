import { prisma } from "../../../../../config/prisma.connect"
import hashPassword from "../../../../../lib/hashPassword"
import { userSignupValidation } from "../../../../../lib/validate"
import _isAvailable from "../../../../../lib/_isAvailable"

export default async function handler(req, res) {
    const error = userSignupValidation(req.body)
    if (error) return res.status(400).send(error)

    const { username, email, password } = req.body

    try {
        let newUser = undefined
        return (await _isAvailable(email))
            ? ((newUser = await prisma.user.create({
                  data: {
                      email: email,
                      username: username,
                      password: await hashPassword(password),
                      isEnabled: false,
                      isVerified: false,
                      role: "BASIC",
                  },
              })),
              res.status(201).json({ message: newUser }))
            : res.status(400).json({
                  message: "email is taken and this account is verified",
              })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: error.message,
        })
    }
}
