
import { useContext, createContext } from "react"
import {  useRouter } from "next/router"
import api from "./api"

const AuthContext = createContext()


export const getUser = async (ctx) => {
    api.defaults.headers = ctx?.req?.headers?.cookie
        ? { cookie: ctx.req.headers.cookie }
        : undefined
    return await api
        .get("api/auth/me", {
            withCredentials: true,
        })
        .then((response) => {
            if (response.data) {
                return { status: "SIGNED_IN", user: response.data }
            } else {
                return { status: "SIGNED_OUT", user: null }
            }
        })
        .catch((error) => {
            return { status: "SIGNED_OUT", user: null }
        })
}
export const AuthProvider = (props) => {
    const router = useRouter()
    const auth = props.myAuth || { status: "SIGNED_OUT", user: null }
    const login = async (email, password) => {
        const data = {
            email,
            password,
        }
        return await api
            .post("api/auth/student/login", data, {
                withCredentials: true,
            })
            .then(() => {
                router.push("/courses")
                console.log("user signed in")
            })
            .catch((error) => {
                console.error("Incorrect email or password entered.")
            })
    }
    const register = async (email, password) => {
        const data = {
            email, password
        }
        return await api.post('signup route here', data, {
            withCredentials: true,
        })
            .then(function (response) {
                router.push("/")
                console.log("user registered")
            })
            .catch(function (error) {
                console.error(error.message)
            })
    }
    const logout = async () => {
        return await api
            .get(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
                withCredentials: true,
            })
            .then(() => {
                router.push("/")
                console.log("user logged out")
            })
            .catch((error) => {
                console.error(error.message)
            })
    }

    return (
        <AuthContext.Provider
            value={{ auth, logout, register, login }}
            {...props}
        />
    )
}
export const useAuth = () => useContext(AuthContext)
export const AuthConsumer = AuthContext.Consumer
