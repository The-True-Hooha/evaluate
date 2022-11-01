import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


export default async function handler(req, res) {
    // res.status(200).json({ name: 'John Doe' })

    const prisma = new PrismaClient();

    const {username, email, password} = req.body;

    // validator for input field
    //todo: no field in the schema for first name and last name
    //todo: updates schema file
    if(!username || !email || !password){
        res.status(400).json({
            message: "missing field, please make sure all inputs are field correctly"
        });
        return;
    }

    
    const token = (userId, email) => {
        return jwt.sign({id: userId, email}, process.env.SECRET, {
            expiresIn: process.env.TIME
        })
    }
    const generateHash = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, generateHash)
    
    prisma.user.findUnique({
        where: {
            email: email
        }
    }).then(user => {
        if(user) {
            res.status(400).json({
                message: "email already taken"
            });
        } else {
            prisma.user.findUnique({
                where: {
                    password: hashedPassword
                }
            }).then(user => {
                if(user) {
                    res.status(400).json({
                        message: "password has previously been used already"
                    });
                } else{
                    prisma.user.create({
                        data: {
                            email: email,
                            username: username,
                            password: hashedPassword
                        }
                    }).then(user => {
                        res.status(201).json({
                            message: "account created successfully",
                            user: user
                        })
                        console.log(user)
                    });
                }
            });
        }
    });
}