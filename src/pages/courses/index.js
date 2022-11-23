import api from "../../lib/api"
import { getUser, useAuth } from "../../lib/AuthContext"
import { useRouter } from "next/router"

export default function Home({ course }) {
    const { auth } = useAuth()
    const router = useRouter()

    if (auth.status == "SIGNED_OUT") {
        return <h1>Not Authenticated</h1>
    }
    const {
        user: { username },
    } = auth

    const handleClick = () => {
        router.push(`/courses/${course.courseId}`)
    }
    return (
        <div>
            <h1>Welcome {username}</h1>
            <h1>Your classes are </h1>
            <button onClick={handleClick}>{JSON.stringify(course)}</button>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { user } = await getUser(ctx)
    const {
        data: { course },
    } = await api.post("api/ops/student/read/getStudentCourses", {
        userId: user.userId,
    })
    return {
        props: {
            course,
        },
    }
}
