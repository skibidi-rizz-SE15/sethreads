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
            {registeredCourses.map((course) =>
                <option
                    value={course.course_id}
                    onClick={() => {
                        setSelectedCourseId(course.course_id);
                        setSelectedCourse(course.name);
                    }}
                    className="block px-4 py-2 text-sm" role="menuitem"
                >
                    {course.name}
                </option>
            )}
        </select>
    )
}
export default CourseDropdown