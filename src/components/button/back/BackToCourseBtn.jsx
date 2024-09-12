import React from "react";

const BackToCourseBtn = () => {
    return (
        <button className="absolute left-0 top-0 flex p-1.5 m-2 w-fit text-sm font-medium tracking-normal leading-5 text-center items-center text-white whitespace-nowrap rounded-lg hover:bg-comment-highlight">
            <img loading="lazy" src="https://cdn-icons-png.flaticon.com/512/5720/5720446.png" alt="Back Icon" className="object-contain shrink-0 self-start w-8 aspect-square" />
        </button>
    )
}

export default BackToCourseBtn