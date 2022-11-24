import Axios from "axios"

let urls = {
    development: "http://localhost:3000/",
    production: "https://your-production-url.com/",
}

const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})

export const rceHttpClient = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})

rceHttpClient.interceptors.request.use((config) => {
    console.log("here")
    return config
})

export default api

