import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';

export default function Home() {
  const [data, setData] = useState({ src: "" });
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:3000/api/rce/submit`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const ans = await res.json()
    let data1 = null;

    let response = await fetch(`http://localhost:3000/api/rce/getJob/${ans.jobId}`)

    while (response.status >= 400) {
      response = await fetch(`http://localhost:3000/api/rce/getJob/${ans.jobId}`)
      data1 = await response.json()
    }
    if (data1.output.S === "") {
      setError(data1.error.S)
    } else {
      setOutput(data1.output.S)
    }
  }


  return (
    <div className="App">
      <textarea onChange={handleChange} name="src" className='text-green-600'> </textarea>
      {output && <div>{output}</div>}
      {error && <div className='text-red-600'>{error}</div>}
      <button onClick={handleSubmit}>submit</button>
    </div>
  )
}
