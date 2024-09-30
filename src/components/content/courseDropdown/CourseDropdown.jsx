import React, { useState } from "react";

const CourseDropdown = ({ registeredCourses, setSelectedCourseId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative flex w-[20rem] text-left">
            <button
                type="button"
                className="flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={toggleDropdown}
            >
                <span className="mr-auto">Select a course</span>
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {console.log(registeredCourses)}
                        {registeredCourses.map((course) => 
                            <div 
                                key={course.course_id}
                                onClick={() => {
                                    setSelectedCourseId(course.course_id);
                                    setIsOpen(false);
                                }}
                            >
                                    {console.log(course.name)}
                                    {course.name}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
export default CourseDropdown