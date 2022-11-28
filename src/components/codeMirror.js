import { useState } from "react"
import api from "../lib/api"
import CodeMirror from "@uiw/react-codemirror"
import { langs } from "@uiw/codemirror-extensions-langs"
import { githubDark, githubLight } from "@uiw/codemirror-themes-all"
import { pythonDefault } from "../lib/defaults"
import { rceHttpClient } from "../lib/api"
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
    const [codeActivity, setCodeActivity] = useState(pythonDefault)
    const [codeActivityResult, setCodeActivityResult] = useState([])
    const [output, setOutput] = useState(null)
    const [error, setError] = useState(null)
    
    
    const submitCodeActivity = async () => {
        const data = { src: codeActivity, testCases: testCases, lang: language, skeletonCode : skeletonCode }
        try {
            await rceHttpClient
                .post(
                    "https://la31aurjlk.execute-api.us-east-1.amazonaws.com/prod/grade-code",
                    data
                )
                .then(async ({ data: { error, output } }) => {
                    setError(error)
                    setOutput(output)
                })
        } catch (error) {
            alert(error.message)
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
                    extensions={[langs.python()]}
                    // options={{
                    //     keyMap: 'sublime',
                    //     mode: "python",
                    // }}
                    onChange={(value) => {
                        setCodeActivity(value)
                    }}
                    className='border border-black p-1 '
                />
                {error && <div className='text-red-500'>{error}</div>}
                {output && (
                    <div className='text-green-500'>
                        {output.map((e, index) => {
                            return (
                                <ul key={index}>
                                    <li>{e == "True" ? "✅" : "❌"}</li>
                                </ul>
                            )
                        })}
                    </div>
                )}
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
