import "../styles/globals.css"
import { AuthProvider, ProtectRoute } from "../lib/AuthContext"

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Component {...pageProps} />
            </ProtectRoute>
        </AuthProvider>
    )
}


export default MyApp
