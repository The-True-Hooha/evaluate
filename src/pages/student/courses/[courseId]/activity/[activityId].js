import { useState, useEffect } from "react"
import CodeUi from "../../../../../components/codeMirror"
import api from "../../../../../lib/api"
import { getUser } from "../../../../../lib/AuthContext"

export default function StudentActivity({ info, sid, submissions}) {
    const [hasTaken, setHasTaken] = useState(false)
    const {
       
        numofattempts,
        codingActivity: { codingactivityId, question, language, skeletonCode },
    } = info

    useEffect(() => {
        submissions.map(e => {
            if(e.codingActivityId === codingactivityId){
               setHasTaken(true)
            }
        })
    }, [])

    if(hasTaken){
      return (
        <div className="text-secondary text-2xl uppercase font-bold">You have taken this activity already....</div>
      )
    }
    
    return (
        <div className='flex justify-center'>
            <div className='App'>
                <h1 className='text-xl text-white'>
                    Welcome this is a coding activity in{" "}
                    <span className='font-bold text-secondary'>{language}</span>
                </h1>
                <p className='text-xl text-white'>
                    The questions is :{" "}
                    <span className='text-2xl font-bold text-secondary'>
                        {question}
                    </span>
                </p>
            </div>
            <CodeUi
                language={language}
                codingActivityId={codingactivityId}
                skeletonCode={skeletonCode}
                sid={sid}
                numofattempts={numofattempts}
            />
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const {
        user: { sid },
    } = await getUser(ctx)
    const { activityId } = ctx.query
    let res = await api.get(`api/ops/activity/read/${activityId}`)
    const info = res.data

    res = await api.get(`api/ops/student/read/submissions/${sid}`)
    const submissions = res.data.submissions

    return {
        props: { info, sid, submissions },
    }
}
