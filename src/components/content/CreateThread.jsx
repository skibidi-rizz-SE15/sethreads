import React, { useState } from "react";
import ThreadBodyEditor from "../textEditor/ThreadBodyEditor";
import ThreadTitleEditor from "../textEditor/ThreadTitleEditor";
import CourseDropdown from "./courseDropdown/CourseDropdown";
import PostThreadBtn from "../button/createThread/postThreadBtn";

const CreateThread = ({ registeredCourses, studentId }) => {
    //selectedCourseId can be a course ID or 'home'
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [title, setTitle] = useState(""); 
    const [body, setBody] = useState(""); 

    return (
        <main className="flex overflow-y-auto w-full">
            <div className="flex flex-col min-h-full h-max gap-8 px-16 py-8 mx-auto w-[60rem] bg-neutral-800">
                <h1 className="mb-4 text-center color text-gray-50 font-bold text-2xl">Create Thread</h1>
                <CourseDropdown registeredCourses={registeredCourses} setSelectedCourseId={setSelectedCourseId} selectedCourseId={selectedCourseId} />
                <ThreadTitleEditor onChange={setTitle} />
                <ThreadBodyEditor onChange={setBody} />
                <PostThreadBtn title={title} body={body} createBy={studentId} />
            </div>
        </main>
    );
};

export default CreateThread;
