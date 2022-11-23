import { PrismaClient } from "@prisma/client"
import prismaErrorWrapper from "../../../../../lib/prismaErrorWrapper"
const prisma = new PrismaClient()

export default function(req, res){
    const {fid} = req.body

    return prismaErrorWrapper(res, async () =>{
        return await prisma.faculty.findUnique({
            where : {
                fid : fid
            },
            select : {
                course : true
            }
        })
    })
}   