import React from 'react';
import { FaTrash } from "react-icons/fa6";

function TableCourses({ student, isEditCourses, onDelete }) {

    return (
        <table className='col-span-2 w-full mt-4 table-auto border-collapse'>
            <thead>
                <tr className='bg-gray-100 border-b'>
                    <th className='p-3 text-sm font-medium text-gray-600'>Course ID</th>
                    <th className='p-3 text-sm font-medium text-gray-600'>Course Name</th>
                    <th className={`p-3 text-sm font-medium text-gray-600 ${ isEditCourses ? "" : "hidden" }`}>Remove</th>
                </tr>
            </thead>
            <tbody>
                { student.registered_courses.map((course) => {
                    return (
                        <tr key={course.course_id} className='hover:bg-orange-50 transition-colors duration-150 border-b last:border-b-0 bg-gray-50'>
                            <td className='p-2 text-sm text-gray-700 text-center'>{course.course_id}</td>
                            <td className='p-2 text-sm text-gray-700'>{course.name}</td>
                            <td className={`p-1 text-sm text-gray-700 flex justify-center items-center ${ isEditCourses ? "" : "hidden" }`}>
                                <div className='w-7 py-2 hover:bg-red-100 hover:cursor-pointer rounded-full transition duration-150' onClick={() => onDelete(course.course_id, course.name)} >
                                    <FaTrash className='text-red-500 mx-auto' />
                                </div>
                            </td>
                        </tr>
                    )
                }) }
            </tbody>
        </table>
    )
}

export default TableCourses