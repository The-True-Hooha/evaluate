import { useState } from "react"
import route from "next/router"
import { useAuth } from "../lib/AuthContext"

export default function LoginPage() {
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const { login } = useAuth()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { email, password } = data
            const {
                data: { accessToken },
            } = await login(email, password)
            return route.push("/")
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
        <div className='flex justify-between'>
            <div className='w-[50%] bg-white'>
                <div className='py-4'>
                    <div className='py-[160px] px-[150px]'>
                        <h2 className='text-[30px] font-semibold'>
                            Welcome back
                        </h2>
                        <p className='text-[15px] font-semibold text-[#51555a]'>
                            please enter your login credentials.
                        </p>
                        <div className='pt-6'>
                            <form onSubmit={handleSubmit}>
                                <label
                                    for='email'
                                    className='mb-2 block font-medium text-gray-900'>
                                    email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    onChange={handleChange}
                                    required
                                    placeholder='enter email'
                                    className='block w-full rounded-lg border border-green-500 bg-white p-2.5 text-sm focus:border-green-500 focus:outline-green-500'
                                />
                                <div className='mt-6'>
                                    <label
                                        for='password'
                                        className='mb-2 block font-medium text-gray-900'>
                                        password
                                    </label>
                                    <input
                                        type='password'
                                        name='password'
                                        required
                                        onChange={handleChange}
                                        placeholder='enter password'
                                        className='block w-full rounded-lg border border-green-500 bg-white p-2.5 text-sm focus:border-green-500 focus:outline-green-500'
                                    />
                                </div>
                                <div className='mt-3 text-sm text-red-500'>
                                    {error && <div>{error}</div>}
                                </div>
                                <div className='mt-4'></div>
                                <button
                                    type='submit'
                                    className='mt-4 w-full rounded-lg bg-green-500 px-[235px] py-2.5 text-center text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 sm:w-auto'
                                    onClick={handleSubmit}>
                                    login
                                </button>
                            </form>
                            <div className='flex w-full justify-center'>
                                <p className='pt-4 text-[15px] text-[#51555a]'>
                                    dont have an account?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
