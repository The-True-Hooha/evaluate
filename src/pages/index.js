
import Head from 'next/head'

export default function Home() {
    return (
        <div className='App'>
            <Head>
                <title>evaluate</title>
                <meta name='description' content='web editor based rce' />
            </Head>

            <div className='flex justify-center pt-8'>
                <div className='text-center'>
                    <img
                        className='mx-auto w-48'
                        src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp'
                        alt='logo'
                    />
                    <h4 className='mt-1 mb-12 pb-1 text-[30px] font-semibold text-white'>
                        Welcome to Evaluate
                    </h4>
                </div>
            </div>
        </div>
    )
}
