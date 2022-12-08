import StudentActivities from "../../../../components/StudentActivities"
import api from "../../../../lib/api"

export default function Index({ info }) {
    const {
        instructor: { firstname, lastname },
        activities,
    } = info

    if (activities.length === 0) {
        return (
            <h1 className='text-secondary'>You have no activities available</h1>
        )
    }

    return (
        <div>
            {activities.map((e, index) => {
                return (
                    <div className='flex flex-col items-center gap-10 md:flex-row'>
                        <StudentActivities
                            topic={e.topic}
                            point={e.points}
                            numberOfAttempts={e.numofattempts}
                            available={true}
                            availableto={e.availableto}
                            activityId={e.activityId}
                            key={e.activityId}
                        />
                    </div>
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
