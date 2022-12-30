// import Link from "next/link"
import { TfiCommentAlt } from "react-icons/tfi"
import Link from "next/link"
import React from "react"
import Lottie from "./lottie"

export default function Page() {
    return (
        <div className="w-full h-full bg-white">
            {/* <div className='flex justify-center pt-8 w-full h-full'>
                <div className='mt-4 text-center'>
                    <TfiCommentAlt className=' my-2 text-5xl text-secondary' />
                    <h4 className='my-2 pb-1 text-[30px] font-semibold text-secondary'>
                        Evaluate
                    </h4>
                    <div>
                        <h3 className="text-[20px]">
                            A multi smart grading system equipped with an online text editor for code
                        </h3>
                    </div>
                    <Link
                        href={"/login"}
                        className='hover:text-neon_carrot-100 px-3 text-xl font-bold uppercase text-secondary hover:underline'>
                        login
                    </Link>
                    <Link
                        href={"/register"}
                        className='hover:text-neon_carrot-100 px-3 text-xl font-bold uppercase text-secondary hover:underline'>
                        signup
                    </Link>
                </div>
            </div> */}
                <header className="h-[60px] fixed w-full z-10 shadow-lg backdrop-blur-[100px]">
                    <nav className="flex items-center w-full h-full px-[40px]">
                    <Link href="/faculty/login">
                    <h2 className="ml-[40px] hover:text-secondary cursor-pointer hover:font-bold">Faculty</h2>
                    </Link>
                    <Link href="/student/login">
                    <h2 className="ml-[55px] hover:text-secondary cursor-pointer hover:font-bold">Student</h2>
                    </Link>
                    <div className="absolute right-[80px]">
                        <ul className="flex font-semibold">
                            <Link href="/student/login">
                            <li className="ml-[60px] cursor-pointer my-4">Log in</li>
                            </Link>
                            <Link href="/student/register">
                            <li className="ml-[30px] cursor-pointer text-white  border px-5 py-3 rounded bg-secondary items-center ">signup</li>
                            </Link>
                        </ul>
                    </div>
                    </nav>
                </header>
                <div className="pt-[150px] pl-[180px]">
                    <div className="w-full">
                        <h2 className="mt-5 text-secondary text-[40px] font-bold text">
                            Evaluate
                        </h2>
                    <h3 className="text-[45px] mt-[-13px]">for students</h3>
                    <p1 className="text-[20px] mt-[40px]">
                        A multi smart grading system equipped with <span className="">an online text editor for code</span>
                    </p1>
                    <Lottie/>
                    </div>
                    <div className="mt-[30px]">
                        <Link href="/student/register">
                        <button className="text-[18px] border bg-black px-6 py-2 rounded-lg text-white">
                            get access
                        </button>
                        </Link>
                    </div>
                </div>
        </div>
    )
}



