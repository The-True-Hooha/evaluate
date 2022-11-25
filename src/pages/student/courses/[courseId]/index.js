import { useRouter } from "next/router"
import api from "../../../../lib/api"

export default function Index({ info }) {
    const router = useRouter()
    const {
        instructor: { firstname, lastname },
        activities,
    } = info
    if (activities.length === 0) {
        return (
            <h1 className='text-neon_carrot-100'>
                You have no activities available
            </h1>
        )
    }
    const handleClick = (e) => {
        console.log(e)
        router.push(`${router.asPath}/activity/${e.activityId}`)
    }

    return (
        <div>
            {activities.map((e) => {
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
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    const { courseId } = ctx.query

    if (!regexExp.test(courseId)) {
        return {
            redirect: {
                permanent: false,
                destination: "/student/404",
            },
        }
    }
    const res = await api.get(`api/ops/course/read/${courseId}`)
    const info = res.data

    if (!info) {
        return {
            redirect: {
                permanent: false,
                destination: "/student/404",
            },
        }
    }

    return {
        props: {
            info,
        },
    }
}
