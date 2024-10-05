import React, { useEffect, useState } from "react";
import Details from "./Details";
import Edit from "./Edit";
import TableCourses from "./TableCourses";
import Separator from "../../separator/Separator";

const ProfileAlert = ({ isOpen, onClose, children }) => {
  const [inputTACourse, setInputTACourse] = useState(null);
  const [isEditCourses, setIsEditCourses] = useState(false);

  useEffect(() => {
    if (children) {
      setInputTACourse(children.is_ta ? children.ta_course_id : "N/A");
    }
  }, [children]);

  function handleInputTACourse(e) {
    setInputTACourse(e.target.value);
  }

  function toggleEditCourses() {
    setIsEditCourses(true);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-10 bg-eerie-black text-white p-6 rounded-lg shadow-xl w-[70rem]">
        <button
          className="absolute top-2 right-2 text-software-orange hover:text-software-orange-hover"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="grid grid-cols-[repeat(2,1fr)]">
          <Details student={children} />
          <Edit 
            student={children} 
            inputTACourse={inputTACourse}
            handleInputTACourse={handleInputTACourse}
            isEditCourses={isEditCourses}
            toggleEditCourses={toggleEditCourses} 
          />
          <Separator className="col-span-2 mt-10"/>
          <h1 className="text-gray-300 text-2xl text-center mt-5 col-span-2">
            Registered Courses
          </h1>
          <TableCourses 
            student={children}
            isEditCourses={isEditCourses}  
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileAlert;
