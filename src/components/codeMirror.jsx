import { useState } from "react"
import api from "../lib/api"
import CodeMirror from "@uiw/react-codemirror"
import { langs } from "@uiw/codemirror-extensions-langs"
import { githubDark, dracula } from "@uiw/codemirror-themes-all"
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
    const [isLoading, setIsLoading] = useState(false)

    const RunButton = ({ state, func }) => {
        return (
            <button
                className={`inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold ${
                    state === "disabled" ? "cursor-not-allowed" : ""
                }`}
                disabled={state == "disabled" ? true : false}
                onClick={() => func()}>
                RUN
            </button>
        )
    }

    const SubmitButton = ({ state, func }) => {
        return (
            <button
                className={`ml-3 inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold ${
                    state === "disabled" ? "cursor-not-allowed" : ""
                }`}
                disabled={state == "disabled" ? true : false}
                onClick={() => func()}>
                SUBMIT
            </button>
        )
    }

    const runCodeActivity = async () => {
        const data = {
            code: codeActivity,
            language: language,
            skeletonCode: skeletonCode,
        }
        try {
            setIsLoading(true)
            setOutput("")
            await axios
                .post(process.env.NEXT_PUBLIC_LAMBDA_RUN_CODE_URL, data)
                .then(async ({ data: { result } }) => {
                    setOutput(result)
                })
            setIsLoading(false)
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
            setIsLoading(true)
            setOutput("")
            await axios
                .post(process.env.NEXT_PUBLIC_LAMBDA_GRADE_CODE_URL, data)
                .then(async ({ data: { result } }) => {
                    const post_data = {
                        codingActivityId: codingActivityId,
                        score: result,
                        sourceCode: codeActivity,
                    }
                    await axios.post(
                        `/api/ops/student/update/assignGrade/${sid}`,
                        post_data
                    )
                    setIsLoading(false)
                    return router.push("/student/dashboard")
                })
        } catch (error) {
            setOutput(
                "Something went wrong please contact tochey@outlook.com or try again"
            )
        }
    }

    return (
        <div className='h-[] pt-[30px]'>
            <div className='absolute top-40 bottom-40 left-20 right-20 my-20 w-[70%] text-left'>
                <CodeMirror
                    value={codeActivity}
                    placeholder='enter your code here'
                    theme={dracula}
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
                {!isLoading ? (
                    <div className='mt-3'>
                        <RunButton state={"enabled"} func={runCodeActivity} />
                        <SubmitButton
                            state={"enabled"}
                            func={submitCodeActivity}
                        />
                    </div>
                ) : (
                    <>
                        <div className='text-xl font-bold text-secondary'>
                            please wait...
                        </div>
                        <div className='mt-3'>
                            <RunButton
                                state={"disabled"}
                                func={runCodeActivity}
                            />
                            <SubmitButton
                                state={"disabled"}
                                func={submitCodeActivity}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
