import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({
            message: "field cannot be left empty"
        });
        return;
    }

    // const checkPassword = await bcrypt.compare(
    //     password,
        
    // )
    prisma.user.findUnique({
        where: {
            email: email
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
                res.status(201).json({
                    message: "login successful"
                })
            }
        } else{
            res.status(404).json({
                message: "account does not exist"
            })
        }
    });
}