import Head from "next/head"
import Image from "next/image"
import React, { useState } from "react"

export default function Home() {
    const [data, setData] = useState({ src: "" })
    const [output, setOutput] = useState("")
    const [error, setError] = useState("")

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    const handleSubmit = async () => {
        const res = await fetch(`http://localhost:3000/api/rce/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const ans = await res.json()
        let data1 = null

    //     let response = await fetch(
    //         `http://localhost:3000/api/rce/getJob/${ans.jobId}`
    //     )
    //     data1 = await response.json()

    //     if (data1.output.S === "") {
    //         setError(data1.error.S)
    //     } else {
    //         setOutput(data1.output.S)
    //     }
    // }

    return (
        <div className='App'>
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

            <div className="flex justify-center">
                <h2 className="text-green-600 text-center"> welcome </h2>

                <CodeUi/>
            </div>
        </div>
    )}
}