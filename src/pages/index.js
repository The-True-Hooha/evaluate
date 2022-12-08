import Head from "next/head"
import Link from "next/link"
import {TfiCommentAlt} from "react-icons/tfi"
export default function Home() {
    return (
        <div className='App'>
            <Head>
                <title>evaluate</title>
                <meta name='description' content='web editor based rce' />
            </Head>

            <div className='flex justify-center pt-8'>
                <div className='text-center mt-4'>
                    <TfiCommentAlt className=" text-5xl text-secondary my-2"/>
                    <h4 className='my-2 pb-1 text-[30px] font-semibold text-secondary'>
                        Welcome to Evaluate
                    </h4>
                    <Link
                    href={"/login"}
                    className='hover:text-neon_carrot-100 hover:underline text-secondary font-bold text-xl uppercase px-3'>
                    login
                    </Link>
                    <Link
                    href={"/register"}
                    className='hover:text-neon_carrot-100 hover:underline text-secondary font-bold text-xl uppercase px-3'>
                    signup
                    </Link>
                </div>
            </div>
        </div>
    )
}
