import React, { useState } from "react";
import ThreadBodyEditor from "../textEditor/ThreadBodyEditor";
import ThreadTitleEditor from "../textEditor/ThreadTitleEditor";
import CourseDropdown from "./courseDropdown/CourseDropdown";

const CreateThread = ({ registeredCourses }) => {
    //selectedCourseId can be a course ID or 'home'
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    return (
        <main className="flex overflow-y-auto w-full">
            <div className="flex flex-col min-h-full h-max px-16 py-8 mx-auto w-[60rem] bg-neutral-800">
                <h1 className="mb-12 text-center color text-gray-50 font-bold text-2xl">Create Thread</h1>
                <CourseDropdown registeredCourses={registeredCourses} setSelectedCourseId={setSelectedCourseId} selectedCourseId={selectedCourseId} />
                <ThreadTitleEditor />
                <ThreadBodyEditor />
            </div>
        </main>
        
    )
}
export default CreateThread;