import { useRouter } from "next/router"
import api from "../../../lib/api"
import { getUser } from "../../../lib/AuthContext"


export default function Dashboard({ course }) {
    const router = useRouter()
    const handleClick = () => {
        
        router.push(`/faculty/courses/${course.courseId}`)
    }
    return (
        <div>
            Welcome faculty
            <button onClick={() => handleClick()}>
                Here are your courses: {JSON.stringify(course)}
            </button>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { user, status } = await getUser(ctx)

    const {
        data: { course },
    } = await api.post("api/ops/faculty/read/getFacultyCourses", {
        fid: user.fid,
    })

    return {
        props: {
            course,
        },
    }
}
