import api from "../../../lib/api"
import { getUser, useAuth } from "../../../lib/AuthContext"
import { useRouter } from "next/router"
import { render } from "react-dom"
import { useState } from "react"

export default function Home({ courses }) {
    const { auth } = useAuth()
    const router = useRouter()
    const [accessCode, setAccessCode] = useState(null)
    const [error, setError] = useState()
    const {
        user: { username, sid },
    } = auth

    const handleChange = ({ currentTarget: input }) => {
        setAccessCode(input.value)
    }

    const enroll = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post(
                `api/ops/course/update/enroll/${sid}`,
                {
                    accessCode: accessCode,
                }
            )
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const handleClick = (course) => {
        router.push(`/student/courses/${course.courseId}`)
    }
    return (
        <div>
            <h1 className='text-neon_carrot-100'>Welcome {username}</h1>
            <h1 className='text-neon_carrot-100'>Your classes are </h1>
            {courses.map((e) => {
                return (
                    <>
                        <button
                            key={e.courseId}
                            onClick={() => handleClick(e)}
                            className='text-neon_carrot-100'>
                            {JSON.stringify(e)}
                        </button>
                        <br />
                        <br />
                    </>
                )
            })}

            <input
                placeholder='Enroll in course'
                name='accessCode'
                onChange={handleChange}></input>
            <button className='text-green-500' onClick={(e) => enroll(e)}>
                {" "}
                submit{" "}
            </button>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { user, status } = await getUser(ctx)
    if (status == "SIGNED_OUT") {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        }
    }
    const {
        data: { courses },
    } = await api.post("api/ops/student/read/getStudentCourses", {
        sid: user.sid,
    })

    return {
        props: {
            courses,
        },
    }
}
