import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import { FaCheck, FaXmark } from "react-icons/fa6"; 

function Details({ student }) {
  return (
    <div>
        <div className='bg-eerie-black flex items-center w-full'>
        <CgProfile className='text-white text-6xl mr-8' />
        <div className='flex flex-col w-fit'>
                <p className='text-white text-lg'>{student.student_id}</p>
                <p className='text-white text-lg'>{student.name} {student.surname}</p>
                <p className='text-white text-lg'>Year {student.year}</p>
                <div className='flex items-center'>
                    <p className='text-white text-lg mr-2'>TA Status: </p>
                    {student.is_ta ? <FaCheck className='text-green-check'/> : <FaXmark className='text-red-600'/>}
                    {student.is_ta ? <p className='text-white text-lg ml-5'>[{student.courseTAInfo.course_id} {student.courseTAInfo.name}]</p> : ""}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Details