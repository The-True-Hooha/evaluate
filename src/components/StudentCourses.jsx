export default function StudentCourses({
    coursename,
    academicterm,
    instructor,
    lOBJ,
    handleClick
}) {
    return (

            <div class='mt-5'>
                <div class='block max-w-sm rounded-lg bg-white text-center shadow-lg px-5'>
                    <div class='border-b border-gray-300 py-3 px-6'>
                        {coursename}
                    </div>
                    <div class='p-6'>
                        <h5 class='mb-2 text-xl font-medium text-gray-900'>
                            Instructor: {instructor.firstName}{" "}
                            {instructor.lastName}
                        </h5>
                        <p className='text-md'>Core Learning Objective:</p>
                        <p class='mb-4 text-gray-700 text-base'>
                            {lOBJ.description}
                        </p>
                        <button
                            type='button'
                            onClick={handleClick}
                            class=' inline-block rounded bg-gradient-to-r from-secondary to-orange-700 px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'>
                            View Activities
                        </button>
                    </div>
                    <div class='border-t border-gray-300 py-3 px-6 text-gray-600'>
                        {academicterm}
                    </div>
                </div>
            </div>
    )
}
