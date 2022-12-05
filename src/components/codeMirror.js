import { useState } from "react"
import api from "../lib/api"
import CodeMirror from "@uiw/react-codemirror"
import { langs } from "@uiw/codemirror-extensions-langs"
import { githubDark, githubLight } from "@uiw/codemirror-themes-all"
import { javaDefault } from "../lib/defaults"
import { rceHttpClient } from "../lib/api"
import axios from "axios"
// for creating a custom theme
// import { createTheme } from "@uiw/codemirror-themes"
// import { tags as t } from '@lezer/highlight';

export default function CodeUi({
    testCases,
    skeletonCode,
    sid,
    language,
    codingactivityId,
}) {
    const [codeActivity, setCodeActivity] = useState(javaDefault)
    const [codeActivityResult, setCodeActivityResult] = useState([])
    const [output, setOutput] = useState(null)
    const [error, setError] = useState(null)

    const runCodeActivity = async () => {
        const data = {
            code: codeActivity,
            testCases: testCases,
            language: language,
            skeletonCode: skeletonCode,
        }
        try {
            await axios.post("https://bcxpmoqj0b.execute-api.us-east-1.amazonaws.com/prod/run-code", data)
            .then(async ({ data: { result} }) => {
                setOutput(result)
            })
        } catch (error) {
            alert(error)
        }
    }


    const submitCodeActivity = async () => {
        const data = {
            code: codeActivity,
            testCases: testCases,
            language: language,
            skeletonCode: skeletonCode,
        }
        try {
            await axios.post("https://bcxpmoqj0b.execute-api.us-east-1.amazonaws.com/prod/submit-code", data)
            .then(async ({ data: { result} }) => {
                setOutput(result)
            })
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className='h-[] pt-[30px]'>
            <div className='absolute top-20 bottom-40 left-20 right-20 mt-10 w-[70%] text-left'>
                <CodeMirror
                    value={codeActivity}
                    placeholder='enter your code here'
                    theme={githubDark}
                    height='545px'
                    extensions={[langs.java()]}
                    onChange={(value) => {
                        setCodeActivity(value)
                    }}
                    className='border border-black p-1 '
                />
                {output && <div className='text-red-500'>{output}</div>}
                <div className='mt-3'>
                    <button
                        onClick={() => runCodeActivity()}
                        className='rounded-md border border-white p-2 mx-2 text-secondary  hover:font-bold'>
                        Run Code
                    </button>
                    <button
                        onClick={() => submitCodeActivity()}
                        className='rounded-md border border-white p-2 mx-2 text-secondary  hover:font-bold'>
                        Sumbit
                    </button>
                </div>
            </div>
        </div>
    )
}
