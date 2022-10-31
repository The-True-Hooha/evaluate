import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    // res.status(200).json({ name: 'John Doe' })

    const prisma = new PrismaClient();

    const {username, email, password} = req.body;

    // validator for input field
    if(!username || email || password){
        res.status(400).json({
            message: "missing field, please make sure all inputs are field correctly"
        });
        return;
    }

    // todo: change useremail to email and update prisma schema
}