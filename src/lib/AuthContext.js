import React, { createContext, useState, useContext, useEffect } from "react"
import Cookies from "js-cookie"
import api from "../lib/api"

let window_obj = undefined

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => { 
        async function loadUserFromCookies() {
            const token = Cookies.get("evaluate")
            if (token) {
                api.defaults.headers.Authorization = `Bearer ${token}`
                const { data: user } = await api.get("api/me")
                if (user) setUser(user)
            }
            setLoading(false)
            window_obj = window.location.pathname
        }
        loadUserFromCookies()
    }, [])

    const login = async (email, password) => {
        const { data: {accessToken} } = await api.post("api/student/login", {
            email,
            password,
        })
        if (accessToken) {
            const token = Cookies.get("evaluate")
            api.defaults.headers.Authorization = `Bearer ${token}`
            const { data: user } = await api.get("api/me")
            setUser(user)
        }
    }

    const logout = (email, password) => {
        Cookies.remove("token")
        setUser(null)
        delete api.defaults.headers.Authorization
        window.location.pathname = "/login"
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated: !!user, user, login, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading || (!isAuthenticated && window_obj !== '/login')){
      return <div>Please login </div>; 
    }
    return children;
  };



export const useAuth = () => useContext(AuthContext)
