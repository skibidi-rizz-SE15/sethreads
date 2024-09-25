import React from "react";

const ToggleReplyBtn = ({ number, handleOnClick }) => {
    return (
        <button className="flex p-1.5 mt-2 w-fit text-sm font-medium tracking-normal leading-5 text-center items-center text-blue-500 whitespace-nowrap rounded-lg hover:bg-cyan-900" onClick={handleOnClick}>
            {number} replies
        </button>
    )
}

export default ToggleReplyBtn