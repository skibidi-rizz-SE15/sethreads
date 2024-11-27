import React, { useState } from "react";

const CourseDropdown = ({ registeredCourses, setSelectedCourseId }) => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    return (
        <select
            type="button"
            className="flex w-fit text-left justify-center rounded-md shadow-sm px-4 py-2 bg-steadfast font-medium text-white focus:outline-none focus:ring-1 focus:ring-software-orange"
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
            {registeredCourses.map((register) =>
                <option
                    value={register.course.id}
                    onClick={() => {
                        setSelectedCourseId(register.course.id);
                        setSelectedCourse(register.course.name);
                    }}
                    className="block px-4 py-2 text-sm" role="menuitem"
                >
                    {register.course.name}
                </option>
            )}
        </select>
    )
}
export default CourseDropdown