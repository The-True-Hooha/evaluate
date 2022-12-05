import { useRouter } from "next/router"

export default function StudentActivities({
    topic,
    point,
    numberOfAttempts,
    available,
    availableto,
    activityId
}) {
    const router = useRouter()
    const handleClick = (e) => {
       
        router.push(`${router.asPath}/activity/${e}`)
    }
    return (
        <div className='max-w-sm overflow-hidden rounded bg-primary shadow-lg border-x border-secondary text-secondary'>
            <div className='px-6 py-4'>
                <div className='mb-2 text-xl font-bold'>{topic}</div>
                <p className='text-base text-secondary'>
                    Points: {point} | Attempts: {numberOfAttempts} | Due : {new Date(availableto).toLocaleString()}
                </p>
            </div>
            <div className='px-6 py-4'>
                <span className='mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'>
                    {available ? <button onClick={() => handleClick(activityId)}>Start</button> : "Unavailable"}
                </span>
            </div>
        </div>
    )
}
