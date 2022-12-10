import { sign } from "jsonwebtoken"

export const createAccessToken = (id, role) => {
    return sign(
        { id: id, role: role },
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2NzMwMjc4OCwiaWF0IjoxNjY3MzAyNzg4fQ.R1hbt4mebhB_t2a3xvDBdhAb6aO4qniRxIop4-vJkRA",
        {
            expiresIn: "4d",
        }
    )
}
