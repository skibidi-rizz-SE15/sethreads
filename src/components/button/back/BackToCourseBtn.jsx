import React from "react";
import { useParams, Link } from "react-router-dom";


const BackToCourseBtn = () => {
    const { courseId } = useParams();
    return (
        <Link to={`/course/${courseId}`}>
            <button className="absolute left-0 top-0 flex p-1.5 m-2 w-fit text-sm font-medium tracking-normal leading-5 text-center items-center text-white whitespace-nowrap rounded-lg hover:bg-comment-highlight">
                <img loading="lazy" src="https://cdn-icons-png.flaticon.com/512/5720/5720446.png" alt="Back Icon" className="object-contain shrink-0 self-start w-8 aspect-square" />
            </button>
        </Link>
    )
}

export default BackToCourseBtn