export default function Home() {
    return (
        <div className='App'>
            <Head>
                <title>evaluate</title>
                <meta name="description" content="web editor based rce" />
            </Head>
            {/* <textarea
                onChange={handleChange}
                name='src'
                className=' w-60 border-solid border-indigo-200 text-green-600 '
            />
            {output && <div>{output}</div>}
            {error && <div>{error}</div>}
            <button onClick={handleSubmit} className='text-sky-600'>
                submit
            </button> */}

            <div className="flex justify-center">
                <h2 className="text-green-600 text-center"> welcome </h2>

                <CodeUi/>
            </div>
        </div>
    )}