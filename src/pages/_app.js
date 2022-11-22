import "../styles/globals.css"
import { AuthProvider, ProtectRoutes } from "../lib/AuthContext"

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <ProtectRoutes>
                <Component {...pageProps} />
            </ProtectRoutes>
        </AuthProvider>
    )
}

export default MyApp
