import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({
            message: "field cannot be left empty"
        });
        return;
    }

    const refreshToken = jwt.sign({email}, process.env.REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TIME
    });


    prisma.user.findUnique({
        where: {
            email: email,
        }
    }).then(async user => {

        const checkPassword = await bcrypt.compare(
            password,
            user.password
        )
        if(user){
            if(!checkPassword){
                res.status(401).json({
                    message: "incorrect email or password",
                    // user: email
                });
            } else{

                // change env PHASE to production if out of dev
                // used cookies to store the refresh token that is being sent via the header to the client

                const serialized = serialize("evaluate", refreshToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: process.env.PHASE,
                    maxAge: 60 * 60 * 24 * 7, // expires in 1 week
                    path: "/"
                });

                res.setHeader("Set-Cookie", serialized);
                res.status(201).json({
                    message: "login successful",
                    user: user
                })
            }
        } else{
            res.status(404).json({
                message: "account does not exist"
            })
        }        
    });
}