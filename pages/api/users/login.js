import { PrismaClient } from "@prisma/client";

export default function handler(req, res) {
    const prisma = new PrismaClient();

    const {useremail, password} = req.body;

    if(!useremail || !password){
        res.status(400).json({
            message: "field cannot be left empty"
        });
        return;
    }

    prisma.user.findUnique({
        where: {
            useremail: useremail
        }
    }).then(user => {
        if(user){
            if(user.password === password){
                res.status(200).json({
                    message: "login successful",
                    user: useremail
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