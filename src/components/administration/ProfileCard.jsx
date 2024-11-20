import React from 'react';
import { CgProfile } from "react-icons/cg";
import { FaCheck, FaXmark } from "react-icons/fa6";

function ProfileCard({ student, onclick }) {
  return (
    <div className='bg-eerie-black border border-transparent hover:border-software-orange hover:bg-steadfast h-[10rem] p-4 rounded-lg shadow-md grid grid-cols-[auto_1fr] gap-4 w-full items-center transition duration-200 cursor-pointer' onClick={onclick}>
      <CgProfile className='text-white text-6xl' />
        <div className='flex flex-col h-full'>
            <strong className='text-white text-xl mb-1'>{student.student_id}</strong>
            <p className='text-white text-lg'>{student.name}</p>
            <p className='text-white text-lg text-clip'>{student.surname}</p>
        </div>
        <p className='flex h-full justify-center items-center text-white text-base mt-auto'>Year {student.year}</p>
        <div className='flex h-full justify-end items-center'>
            <p className='text-white text-sm mr-2'>TA Status: </p>
            {student.is_ta ? <FaCheck className='text-green-check' /> : <FaXmark className='text-red-600' />}
        </div>
      </div>
  );
}

export default ProfileCard;
