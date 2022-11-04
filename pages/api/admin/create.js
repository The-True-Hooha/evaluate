import prisma from "../../../config/prisma.connect"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export default async function handler(req, res){

    const {username, email, password} = req.body;

    if(!email || !username || !password){
        res.status(400).json({
            message: "field cannot be left empty"
        });
        return;
    }

    const token = jwt.sign({ email }, process.env.SECRET, {
        expiresIn: process.env.TIME,
      });

    const generateHash = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, generateHash);
    try{
        const admin = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if(admin){
            res.status(400).json({
                message: "error, admin with such email exist already!"
            });
        }

        const createAdmin = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword,
                isEnabled: true,
                role: "FACULTY"
            },
        });

        if(createAdmin){
            res.status(201).json({
                message: "admin account created successfully",
                admin: createAdmin,
                token,
            });

            // send email for verification
        }
    } catch(error){
        return res.status(400).json({
            message: `Sorry! An error occurred trying to create admin ${error}`
        });
    }
}