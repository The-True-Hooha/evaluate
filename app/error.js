import Link from "next/link"
export default function Error(){
    return(
            <div className="flex flex-col items-center justify-center">
                <h1 className="font-secondary text-2xl text-center">
                    <span className="font-bold">404 </span>| Page Not Found
                </h1>
                <Link  href="/" className="text-white block hover:bg-secondary">
                    GO BACK HOME
                </Link>
            </div>
    )
}