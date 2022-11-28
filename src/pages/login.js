import { useState, useEffect } from "react"
import Router, { useRouter } from "next/router"
import { getUser, useAuth } from "../lib/AuthContext"
import Link from "next/link"
import Image from "next/image"
import Login from "../components/Login"

export default function StudentLogin() {
    const router = useRouter()
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const { studentLogin } = useAuth()

    const handleStudentChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleStudentSubmit = async (e) => {
        e.preventDefault()
        try {
            const { email, password } = data
            const {
                data: { accessToken },
            } = await studentLogin(email, password)
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <Login
            handleChange={handleStudentChange}
            handleSubmit={handleStudentSubmit}
            redir={'/faculty/login'}
            emailPlaceHolder={'Enter your SSU email'}
            identity="Student"
            inputName="email"
        />
    )
}

export async function getServerSideProps(ctx) {
    const res = await getUser(ctx)
    if (res.status === "SIGNED_OUT") {
        return {
            props: {},
        }
    }
    const {
        status,
        user: { role },
    } = res
    if (status === "SIGNED_IN" && role === "STUDENT") {
        return {
            redirect: {
                permanent: false,
                destination: "/student/dashboard",
            },
        }
    }
    return {
        props: {},
    }
}
