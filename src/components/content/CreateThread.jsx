import React from "react";
import CreateThreadEditor from "../textEditor/CreateThreadEditor";

const CreateThread = () => {
    return (
        <main className="flex flex-col overflow-y-auto px-9 pt-10 mx-auto w-full bg-neutral-800 border max-w-[80%] absolute right-0 bottom-0">
            <CreateThreadEditor />
        </main>
    )
}
export default CreateThread;