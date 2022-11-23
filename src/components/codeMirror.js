import { useState } from "react"
import axios from "axios"
import CodeMirror from "@uiw/react-codemirror"
import { langs } from "@uiw/codemirror-extensions-langs"
import { dracula } from "@uiw/codemirror-theme-dracula"
import { githubDark } from "@uiw/codemirror-themes-all"
import { javaDefault } from "../lib/defaults"

export default function CodeUi() {
    const [codeActivity, setCodeActivity] = useState(javaDefault)
    const [codeActivityResult, setCodeActivityResult] = useState([])

    const submitCodeActivity = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/rce/submit",
                { codeActivity },
                { timeout: 5000 }
            )
            // .then(({ data }) => {
            //     setCodeActivityResult(data.codeActivityResult);
            // })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className='h-[] pt-[30px]'>
            <h1 className='font-bold text-red-500'>hello world</h1>
            <div className='absolute top-20 bottom-40 left-20 right-20 mt-10 w-[70%] text-left'>
                <CodeMirror
                    value={codeActivity}
                    placeholder='enter your code here'
                    theme={githubDark}
                    height='545px'
                    extensions={[langs.python()]}
                    // options={{
                    //     keyMap: 'sublime',
                    //     mode: "python",
                    // }}
                    onChange={(value) => {
                        setCodeActivity(value)
                    }}
                    className='border border-black p-1'
                />
                <div className='mt-3'>
                    <button
                        onClick={() => submitCodeActivity()}
                        className='rounded-md border border-green-700 bg-green-500 p-2'>
                        submit
                    </button>
                </div>
            </div>
        </div>
    )
}
