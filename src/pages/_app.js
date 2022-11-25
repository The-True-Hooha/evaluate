import "../styles/globals.css"
import App from "next/app"
import { getUser } from "../lib/AuthContext"
import { AuthProvider, ProtectRoutes } from "../lib/AuthContext"

function MyApp({ Component, pageProps, auth }) {
    return (
        <AuthProvider myAuth={auth}>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext)
    const auth = await getUser(appContext.ctx)
    return { ...appProps, auth: auth }
}

export default MyApp
