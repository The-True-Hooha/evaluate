import { PrismaClient } from "@prisma/client";

export default function handler(req, res) {
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
    // todo: change email to email and update prisma schema

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
                    password: password
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
                            password: password
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