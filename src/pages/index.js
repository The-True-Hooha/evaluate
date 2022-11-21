import React, { useState } from "react"
import { useAuth } from "../lib/AuthContext"
import api from '../lib/api'


export default function Home() {
    const [data, setData] = useState({ src: "" })
    const [output, setOutput] = useState("")
    const [error, setError] = useState("")
    const {user} = useAuth()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    const handleSubmit = async () => {
        const res = await api.post(`http://localhost:3000/api/rce/submit`, data)

        const ans = await res.data
        let data1 = null

        let response = await fetch(
            `http://localhost:3000/api/rce/getJob/${ans.jobId}`
        )
        data1 = await response.json()

        if (data1.output.S === "") {
            setError(data1.error.S)
        } else {
            setOutput(data1.output.S)
        }
    }

    return (
        <div className='App'>
            <h1>{JSON.stringify(user)}</h1>
            <textarea
                onChange={handleChange}
                name='src'
                className=' w-60 border-solid border-indigo-200 text-green-600 '
            />
            {output && <div>{output}</div>}
            {error && <div>{error}</div>}
            <button onClick={handleSubmit} className='text-sky-600'>
                submit
            </button>
        </div>
    )
}
