import Head from 'next/head'
import CodeUi from '../components/codeMirror'
export default function Home() {
    return (
        <div className='App'>
            <Head>
                <title>evaluate</title>
                <meta name="description" content="web editor based rce" />
            </Head>

            <div className="flex justify-center">
                <h2 className="text-green-600 text-center"> welcome </h2>
                <CodeUi/>
            </div>
        </div>
    )}