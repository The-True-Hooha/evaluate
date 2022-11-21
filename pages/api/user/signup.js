import prisma from "../../../src/config/prisma.connect"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {

  const { username, email, password } = req.body;

  //todo: no field in the schema for first name and last name

  if (!username || !email || !password) {
    res.status(403).json({
      message: "missing field, please make sure all inputs are field correctly",
    });
    return;
  }

  const token = jwt.sign({ email }, process.env.SECRET, {
    expiresIn: process.env.TIME,
  });

  // password hash gen
  const generateHash = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedPassword = await bcrypt.hash(password, generateHash);
  try {
    
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      res.status(400).json({
        message: "email already taken",
      });
    }
    const createUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
        isEnabled: false,
        role: "BASIC"
      },
    });
    if (createUser) {
      res.status(201).json({
        message: "account created successfully",
        user: {
          email: createUser?.email,
          username: createUser?.username,
          role: createUser?.role,
          isEnabled: createUser?.isEnabled
        },
        token,
      });
      // send email to user
    }
  } catch (error) {
    return res.status(400).json({
      message: `Sorry! An error occurred trying to create user ${error}`,
    });
  }
}
