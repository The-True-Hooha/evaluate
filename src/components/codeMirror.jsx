import { useState } from "react"
import api from "../lib/api"
import CodeMirror from "@uiw/react-codemirror"
import { langs } from "@uiw/codemirror-extensions-langs"
import { githubDark, githubLight } from "@uiw/codemirror-themes-all"
import { javaDefault } from "../lib/defaults"
import { rceHttpClient } from "../lib/api"
import axios from "axios"
import { useRouter } from "next/router"
// for creating a custom theme
// import { createTheme } from "@uiw/codemirror-themes"
// import { tags as t } from '@lezer/highlight';

export default function CodeUi({
    skeletonCode,
    sid,
    language,
    codingActivityId,
    numofattempts,
}) {
    const [codeActivity, setCodeActivity] = useState(javaDefault)
    const [codeActivityResult, setCodeActivityResult] = useState([])
    const [output, setOutput] = useState(null)
    const [error, setError] = useState(null)
    const router = useRouter()

    const runCodeActivity = async () => {
        const data = {
            code: codeActivity,
            language: language,
            skeletonCode: skeletonCode,
        }
        try {
            await axios
                .post(
                    "https://nf06lj6pzi.execute-api.us-east-1.amazonaws.com/prod/run-code",
                    data
                )
                .then(async ({ data: { result } }) => {
                    setOutput(result)
                })
        } catch (error) {
            alert(error)
        }
    }

    const submitCodeActivity = async () => {
        const data = {
            code: codeActivity,
            language: language,
            skeletonCode: skeletonCode,
        }
        try {
            await axios
                .post(
                    "https://nf06lj6pzi.execute-api.us-east-1.amazonaws.com/prod/submit-code",
                    data
                )
                .then(async ({ data: { result } }) => {
                    console.log(codingActivityId)
                    const post_data = {
                        codingActivityId: codingActivityId,
                        score: result,
                        sourceCode: codeActivity,
                    }

                    await axios.post(
                        `/api/ops/student/update/assignGrade/${sid}`,
                        post_data
                    )
                    return router.push("/student/dashboard")
                })
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <div className='h-[] pt-[30px]'>
            <div className='absolute top-40 bottom-40 left-20 right-20 my-20 w-[70%] text-left'>
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
                {output && (
                    <div className='text-xl font-bold text-secondary'>
                        {output}
                    </div>
                )}
                <div className='mt-3'>
                    <button
                        onClick={() => runCodeActivity()}
                        className='mx-2 rounded-md border border-white p-2 text-secondary  hover:text-xl hover:font-bold active:text-red-600'>
                        Run Code
                    </button>
                    <button
                        onClick={() => submitCodeActivity()}
                        className='mx-2 rounded-md border border-white p-2 text-secondary  hover:text-xl hover:font-bold active:text-red-600'>
                        Sumbit
                    </button>
                </div>
            </div>
        </div>
    )
}
