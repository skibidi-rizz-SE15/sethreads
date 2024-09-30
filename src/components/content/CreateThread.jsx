import React from "react";
import ThreadBodyEditor from "../textEditor/ThreadBodyEditor";
import ThreadTitleEditor from "../textEditor/ThreadTitleEditor";

const CreateThread = () => {
    return (
        <main className="flex flex-col overflow-y-auto px-9 pt-10 mx-auto w-full bg-neutral-800 border max-w-[80%]">
            <h1 className="text-center color text-gray-50 font-bold text-2xl">Creat Thread</h1>
            <ThreadTitleEditor />
            <ThreadBodyEditor />
        </main>
    )
}
export default CreateThread;