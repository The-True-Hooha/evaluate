import { useRouter } from "next/router"
import api from "../../../../lib/api"

export default function Index({ info }) {
    const { LearningObjective, activity } = info
    const router = useRouter()
    const handleClick = (e) => {
   
        router.push(`${router.asPath}/activity/${e.activityId}`)
    }
    return (
        <div>
            {activity.map((e) => {
                return (
                    <button
                    key={e.activityId}
                        style={{
                            margin: "20px",
                            color: "red",
                            background: "black",
                        }}
                        onClick={() => handleClick(e)}>
                        {e.topic}
                    </button>
                )
            })}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { courseId } = ctx.query
    const res = await api.get(`api/ops/course/read/${courseId}`)
    const info = res.data

    return {
        props: {
            info,
        },
    }
}
