import { BsFillMoonStarsFill } from "react-icons/bs"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import Link from "next/link"
export default function Navbar() {
    const router = useRouter()
    return (
        <section className=''>
            <nav className='md:py mb-10 flex justify-evenly py-7'>
                <h1 className='text-xl font-bold text-secondary '>
                    <Link href='/student/dashboard'>Evaluate</Link>
                </h1>
                <ul className='flex items-center'>
                    <li>
                        <BsFillMoonStarsFill className=' cursor-pointer text-2xl' />
                    </li>
                    <li>
                        <Link
                            href='#'
                            onClick={() => {
                                Cookies.remove("evaluate")
                                router.push("/login")
                            }}
                            className='to-black-500 font-burtons ml-8 rounded-md bg-gradient-to-r from-secondary to-orange-700 px-4 py-2 text-white '>
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    )
}
