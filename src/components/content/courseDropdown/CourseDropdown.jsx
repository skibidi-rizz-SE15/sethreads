import React, { useState } from "react";

const CourseDropdown = ({ registeredCourses, setSelectedCourseId }) => {
    const [selectedCourse, setSelectedCourse] = useState(null);

    return (
        <div className="flex w-[20rem] text-left">
            <select
                onClick={console.log(selectedCourse)}
                type="button"
                className="flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <option value="" className="hidden">
                    {selectedCourse ? selectedCourse : "Select course"}
                </option>
                <option 
                    value="home"
                    onClick={() => {
                        setSelectedCourseId("home");
                        setSelectedCourse("HOME");
                    }}
                >
                        HOME
                </option>
                {registeredCourses.map((course) => 
                    <option 
                        value={course.course_id}
                        onClick={() => {
                            setSelectedCourseId(course.course_id);
                            setSelectedCourse(course.name);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem"
                    >
                            {course.name}
                    </option>
                )}
            </select>
        </div>
    )
}
export default CourseDropdown