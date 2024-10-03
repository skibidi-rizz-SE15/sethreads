import React from 'react';
import { FaCheck, FaXmark } from "react-icons/fa6"; 

function Details({ student }) {
  return (
    <div>
        <div className='bg-eerie-black border border-software-orange flex w-full'>
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
    </div>
  )
}

export default Details