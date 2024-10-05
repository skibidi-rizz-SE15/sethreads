import React, { useEffect, useState } from "react";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { FaCheck, FaXmark } from "react-icons/fa6";

function Details({ student }) {

  useEffect(() => {
    console.log("my prop changed");
  }, [student]);

  return (
    <div className="bg-eerie-black border border-software-orange h-[10rem] p-4 rounded-lg shadow-md grid grid-cols-[auto_1fr] gap-4 w-full items-center">
      <CgProfile className="text-white text-6xl" />
      <div className="flex flex-col h-full">
        <strong className="text-white text-xl mb-1">
          {student.student_id}
        </strong>
        <p className="text-white text-lg">{student.name}</p>
        <p className="text-white text-lg text-clip">{student.surname}</p>
      </div>
      <p className="flex h-full justify-center items-center text-white text-base mt-auto">
        Year {student.year}
      </p>
      <div className="flex h-full justify-end items-center">
        <p className="text-white text-sm mr-2">TA Status: </p>
        {student.is_ta ? (
          <FaCheck className="text-green-check" />
        ) : (
          <FaXmark className="text-red-600" />
        )}
        { student.is_ta && (<p className="text-white text-sm ml-2">[{student.courseTAInfo.name}]</p>) }
      </div>
    </div>
  );
}

export default Details;
