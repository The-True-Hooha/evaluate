import { useContext, createContext } from "react"
import { useRouter } from "next/router"
import api from './api'

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
    const studentLogin = async (email, password) => {
        const data = {
            email,
            password,
        }
        return await api
            .post("api/auth/student/login", data, {
                withCredentials: true,
            })
            .then(() => {
                router.push("/student/courses")
            })
            .catch((error) => {
                console.error("Incorrect email or password entered.")
            })
    }
    const facultyLogin = async (facultyId, password) => {
        const data = {
            facultyId,
            password,
        }
        return await api
            .post("api/auth/faculty/login", data, {
                withCredentials: true,
            })
            .then(() => {
                router.push("/faculty/dashboard")
            })
            .catch((error) => {
                console.error("Incorrect email or password entered.")
            })
    }
    const register = async (email, password) => {
        const data = {
            email,
            password,
        }
        return await api
            .post("signup route here", data, {
                withCredentials: true,
            })
            .then(function (response) {
                router.push("/")
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
            })
            .catch((error) => {
                console.error(error.message)
            })
    }

    return (
        <AuthContext.Provider
            value={{ auth, logout, register, studentLogin, facultyLogin }}
            {...props}
        />
    )
}
export const useAuth = () => useContext(AuthContext)
export const AuthConsumer = AuthContext.Consumer
