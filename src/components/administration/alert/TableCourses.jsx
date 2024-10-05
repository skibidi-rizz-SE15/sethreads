import React, { useState } from 'react';
import { FaTrash } from "react-icons/fa6";

function TableCourses({ student, isEditCourses }) {

    return (
        <div className='bg-eerie-black flex flex-col w-full mt-4 rounded-lg col-span-2'>
            <table className='w-full table-auto border border-slate-400 border-separate rounded-lg bg-white'>
                <thead>
                <tr>
                    <th className='text-gray-500 text-lg rounded-tl-lg bg-gray-50'>Course ID</th>
                    <th className='text-gray-500 text-lg rounded-tr-lg bg-gray-50'>Course Name</th>
                    <th className={`text-gray-500 text-lg rounded-tr-lg bg-gray-50 ${ isEditCourses ? "" : "hidden" }`}>Remove</th>
                </tr>
                </thead>
                <tbody>
                    { student.registered_courses.map((course) => {
                        return (
                            <tr key={course.course_id} className='hover:bg-gray-100'>
                                <td className='text-gray-900 text-lg text-center'>{course.course_id}</td>
                                <td className='text-gray-900 text-lg '>{course.name}</td>
                                <td className={`text-gray-900 text-lg text-center flex justify-center items-center ${ isEditCourses ? "" : "hidden" }`}><FaTrash className='text-red-500 text-center' /></td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div>
    )
}

export default TableCourses