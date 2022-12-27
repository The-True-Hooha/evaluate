import api from "@lib/api"
import { getUser, useAuth } from "@lib/AuthContext"
import { useRouter } from "next/navigation"

export default function Home({ courses }) {
    const { auth } = useAuth()
    const router = useRouter()
    const {
        user: { username },
    } = auth

    const handleClick = () => {
        router.push(`/student/courses/${courses.courseId}`)
    }
    return (
        <div className="text-white">
            <h1>Welcome {username}</h1>
            <h1>Your classes are </h1>
            <button onClick={handleClick}>{JSON.stringify(courses)}</button>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { user, status } = await getUser(ctx)
    if (status == "SIGNED_OUT") {
        return {
            redirect: {
                permanent: false,
                destination: "/student/login",
            },
        }
    }
    const {
        data: { courses },
    } = await api.post("api/ops/student/read/getStudentCourses", {
        sid: user.sid,
    })

    console.log(courses)
    return {
        props: {
            courses,
        },
    }
}
