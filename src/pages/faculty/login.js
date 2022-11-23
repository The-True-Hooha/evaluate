import { useState, useEffect } from "react"
import {useRouter} from "next/router"
import { useAuth } from "../../lib/AuthContext"
import Link from "next/link"

export default function Login() {
    const router = useRouter()
    const [data, setData] = useState({ facultyId: "", password: "" })
    const [error, setError] = useState("")
    const { facultyLogin } = useAuth()


    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { facultyId, password } = data
            const {
                data: { accessToken },
            } = await facultyLogin(facultyId, password)
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <section class='gradient-form h-full bg-gray-200 md:h-screen'>
            <div class='container h-full py-12 px-6'>
                <div class='g-6 flex h-full flex-wrap items-center justify-center text-gray-800'>
                    <div class='xl:w-10/12'>
                        <div class='block rounded-lg bg-white shadow-lg'>
                            <div class='g-0 lg:flex lg:flex-wrap'>
                                <div class='px-4 md:px-0 lg:w-6/12'>
                                    <div class='md:mx-6 md:p-12'>
                                        <div class='text-center'>
                                            <img
                                                class='mx-auto w-48'
                                                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp'
                                                alt='logo'
                                            />
                                            <h4 class='mt-1 mb-12 pb-1 text-xl font-semibold'>
                                                Welcome to Evaluate
                                            </h4>
                                        </div>
                                        <form>
                                        <p class='mb-4'>
                                                Please login to your account
                                            </p>
                                            <div class='mb-4'>
                                                <input
                                                    type='text'
                                                    name='facultyId'
                                                    class='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                                                    id='exampleFormControlInput1'
                                                    placeholder='Faculty Identification Number'
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                />
                                            </div>
                                            <div class='mb-4'>
                                                <input
                                                    type='password'
                                                    name='password'
                                                    class='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                                                    id='exampleFormControlInput2'
                                                    placeholder='Password'
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                />
                                            </div>
                                            <div class='mb-12 pt-1 pb-1 text-center'>
                                                <button
                                                    class='mb-3 inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg'
                                                    type='button'
                                                    data-mdb-ripple='true'
                                                    data-mdb-ripple-color='light'
                                                    style={{
                                                        background:
                                                            "linear-gradient( to right,#ee7724, #d8363a,#dd3675, #b44593 )",
                                                    }}
                                                    onClick={handleSubmit}>
                                                    Log in
                                                </button>
                                                <p>
                                                    Student?{" "}
                                                    <span>
                                                        <Link href='/login'>
                                                           Sign in here
                                                            </Link>
                                                    </span>
                                                </p>
                                            </div>
                                            <div class='flex items-center justify-between pb-6'>
                                                <p class='mb-0 mr-2'></p>
                                                <button
                                                    type='button'
                                                    class='inline-block rounded border-2 border-red-600 px-6 py-2 text-xs font-medium uppercase leading-tight text-red-600 transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0'
                                                    data-mdb-ripple='true'
                                                    data-mdb-ripple-color='light'>
                                                    Danger
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div
                                    class='flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none'
                                    style={{
                                        background:
                                            "linear-gradient( to right,#ee7724, #d8363a,#dd3675, #b44593 )",
                                    }}>
                                    <div class='px-4 py-6 text-white md:mx-6 md:p-12'>
                                        <h4 class='mb-6 text-xl font-semibold'>
                                            Smart and Intuitive grading platform
                                        </h4>
                                        <p class='text-sm'>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
