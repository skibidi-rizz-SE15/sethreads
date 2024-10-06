import axios from "axios";
import React from "react";

const PostCommentBtn = ({ commentBody, handlePostComment, className="" }) => {

    return (
        <button
            className={`flex self-end px-4 py-2 text-lg w-min tracking-normal leading-5 text-white rounded-lg font-semibold ${
                !commentBody ? "opacity-50 cursor-not-allowed bg-neutral-500" : "bg-software-orange hover:bg-software-orange-hover"
            } ${className}`}
            onClick={handlePostComment}
            disabled={!commentBody}
        >
            Comment
        </button>
    );
};

export default PostCommentBtn;
