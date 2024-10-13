import React from 'react';
import { FaTrash } from "react-icons/fa6";

function TableCourses({ student, isEditCourses, onDelete }) {

    return (
        <table className='col-span-2 w-full mt-4 table-auto border border-slate-400 border-separate'>
            <thead className='bg-white'>
                <tr>
                    <th className='text-black text-lg rounded-tl-lg'>Course ID</th>
                    <th className='text-black text-lg rounded-tr-lg'>Course Name</th>
                    <th className={`text-black text-lg rounded-tr-lg ${ isEditCourses ? "" : "hidden" }`}>Remove</th>
                </tr>
            </thead>
            <tbody>
                { student.registered_courses.map((course) => {
                    return (
                        <tr key={course.course_id} className='bg-gray-300 even:bg-gray-400 hover:bg-software-orange-hover'>
                            <td className='text-gray-900 text-lg px-2 text-center'>{course.course_id}</td>
                            <td className='text-gray-900 text-lg px-2'>{course.name}</td>
                            <td className={`text-gray-900 text-lg px-2 text-center flex justify-center items-center ${ isEditCourses ? "" : "hidden" }`}><FaTrash className='text-red-500 text-center hover:cursor-pointer' onClick={() => onDelete(course.course_id)} /></td>
                        </tr>
                    )
                }) }
            </tbody>
        </table>
    )
}

export default TableCourses