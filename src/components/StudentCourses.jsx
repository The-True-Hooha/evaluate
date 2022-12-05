export default function StudentCourses({
    coursename,
    academicterm,
    instructor,
    lOBJ,
    handleClick,
}) {
    return (
        <div class='mt-5'>
            <div class='block max-w-sm rounded-lg bg-primary px-5 text-center shadow-lg'>
                <div class='border-b border-gray-300 py-3 px-6'>
                    {coursename}
                </div>
                <div class='p-6'>
                    <h5 class='mb-2 text-xl  text-white font-bold'>
                    Instructor:
                    <span className="text-secondary uppercase"> {instructor.firstName} {instructor.lastName}</span>
                    </h5>
                    <p className='text-md font-bold text-white'>
                        Core Learning Objective:
                    </p>
                    <p class='mb-4 pt-3 text-secondary'>{lOBJ.description}</p>
                    <button
                        type='button'
                        onClick={handleClick}
                        class=' inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold'>
                        View Activities
                    </button>
                </div>
                <div class='border-t border-gray-300 py-3 px-6 text-secondary'>
                    {academicterm}
                </div>
            </div>
        </div>
    )
}
