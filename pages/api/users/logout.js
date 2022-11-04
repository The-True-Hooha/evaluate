import { serialize } from "cookie";


export default async function handler(req, res){

    const { cookies } = req;
    const jwt = cookies.evaluate;

    if(!jwt){
        return res.json({
            message: "user not logged in..."
        })
    } else{
        const serialized = serialize("evaluate", null, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.PHASE,
            maxAge: -1,
            path: "/"
        });

        res.setHeader("Set-Cookie", serialized);

        res.status(200).json({
            message: "successfully logged out"
        })
    }

}