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
                        <tr key={course.course_id} className='hover:bg-orange-50 transition-colors border-b last:border-b-0 bg-gray-50'>
                            <td className='p-3 text-sm text-gray-700 text-center'>{course.course_id}</td>
                            <td className='p-3 text-sm text-gray-700'>{course.name}</td>
                            <td className={`p-3 text-sm text-gray-700 ${ isEditCourses ? "" : "hidden" }`}><FaTrash className='text-red-500 mx-auto hover:cursor-pointer' onClick={() => onDelete(course.course_id)} /></td>
                        </tr>
                    )
                }) }
            </tbody>
        </table>
    )
}

export default TableCourses