import React from 'react';
import { CgProfile } from "react-icons/cg";
import { FaCheck, FaXmark } from "react-icons/fa6";

function ProfileCard({ student, onclick }) {
  return (
        <div className='bg-eerie-black border border-software-orange h-40 px-8 rounded-lg shadow-md flex w-full items-center' onClick={onclick} >
            <CgProfile className='text-white text-6xl mr-8' />
            <div className='flex flex-col w-fit'>
                <p className='text-white text-lg'>{student.student_id}</p>
                <p className='text-white text-lg'>{student.name} {student.surname}</p>
                <p className='text-white text-lg'>Year {student.year}</p>
                <div className='flex items-center'>
                    <p className='text-white text-lg mr-2'>TA Status: </p>
                    {student.is_ta ? <FaCheck className='text-green-check'/> : <FaXmark className='text-red-600'/>}
                </div>
            </div>
        </div>
  )
}

export default ProfileCard