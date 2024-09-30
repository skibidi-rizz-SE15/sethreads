import React, { useState } from "react";
import ThreadBodyEditor from "../textEditor/ThreadBodyEditor";
import ThreadTitleEditor from "../textEditor/ThreadTitleEditor";
import CourseDropdown from "./courseDropdown/CourseDropdown";

const CreateThread = ({ registeredCourses }) => {
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    return (
        <main className="flex overflow-y-auto w-full">
            <div className="flex flex-col px-9 pt-10 mx-auto w-[60rem] bg-neutral-800 border">
                <h1 className="text-center color text-gray-50 font-bold text-2xl">Create Thread</h1>
                <CourseDropdown registeredCourses={registeredCourses} setSelectedCourseId={setSelectedCourseId} />
                <ThreadTitleEditor />
                <ThreadBodyEditor />
            </div>
        </main>
        
    )
}
export default CreateThread;