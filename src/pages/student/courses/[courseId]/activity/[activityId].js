import CodeUi from "../../../../../components/codeMirror"
import api from "../../../../../lib/api"
import {getUser} from "../../../../../lib/AuthContext"

export default function StudentActivity({ info, sid }) {
    const {
        // topic,
        // learningObjectives,
        codingActivity: { codingActivityId, question, language, testCases, skeletonCode },
    } = info
    
    return (
        <div className='App'>
            <h1 className='text-red-600'>
                Welcome this is a coding activity in{" "}
                <span className='text-neon_carrot-100'>{language}</span>
            </h1>
            <p className='text-red-600'>
                The questions is :{" "}
                <span className='text-neon_carrot-100'>{question}</span>
            </p>
            <title>evaluate</title>
            <div className='flex justify-center'>
                <CodeUi testCases={testCases} language={language} codingActivityId={codingActivityId} skeletonCode={skeletonCode} sid={sid}  />
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const {user : {sid}} = await getUser(ctx)
    const { activityId } = ctx.query
    const res = await api.get(`api/ops/activity/read/${activityId}`)
    const info = res.data
   
    return {
        props: { info, sid },
    }
}
