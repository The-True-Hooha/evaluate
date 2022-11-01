import { PrismaClient } from "@prisma/client";

export default function handler(req, res) {
    const prisma = new PrismaClient();

    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({
            message: "field cannot be left empty"
        });
        return;
    }

    prisma.user.findUnique({
        where: {
            email: email
        }
    }).then(user => {
        if(user){
            if(user.password === password){
                res.status(200).json({
                    message: "login successful",
                    user: email
                });
            } else{
                res.status(400).json({
                    message: "incorrect password or login details"
                })
            }
        } else{
            res.status(404).json({
                message: "account does not exist"
            })
        }
    });
}