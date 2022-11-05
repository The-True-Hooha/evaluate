import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';

export default function Home() {
  const [data, setData] = useState({ src: "" });

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
  }

  return (
    <div className="App">
      <textarea onChange={handleChange} name="src" className='text-green-600'> </textarea>
      <button onClick={handleSubmit}>submit</button>
    </div>
  )
}
