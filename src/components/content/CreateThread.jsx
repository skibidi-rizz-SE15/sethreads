import React, { useState } from "react";
import ThreadBodyEditor from "../textEditor/ThreadBodyEditor";
import ThreadTitleEditor from "../textEditor/ThreadTitleEditor";
import CourseDropdown from "./courseDropdown/CourseDropdown";
import PostThreadBtn from "../button/createThread/postThreadBtn";

const CreateThread = ({ registeredCourses }) => {
    //selectedCourseId can be a course ID or 'home'
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [title, setTitle] = useState(""); 
    const [body, setBody] = useState(""); 
    const createBy = "user123"; 

    return (
        <main className="flex overflow-y-auto w-full">
            <div className="flex flex-col px-9 pt-10 mx-auto w-[60rem] bg-neutral-800 border">
                <h1 className="pb-4 text-center color text-gray-50 font-bold text-2xl">Create Thread</h1>
                <CourseDropdown registeredCourses={registeredCourses} setSelectedCourseId={setSelectedCourseId} selectedCourseId={selectedCourseId} />
                <ThreadTitleEditor />
                <ThreadBodyEditor />
            </div>
        </main>
    );
};

export default CreateThread;
