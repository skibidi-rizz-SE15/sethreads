import React from "react";

const PostCommentBtn = ({ isValid, handlePostComment, className="" }) => {
    return (
        <button
            className={`flex self-end px-4 py-2 text-lg w-min tracking-normal leading-5 text-white rounded-lg font-semibold ${
                !isValid ? "opacity-50 cursor-not-allowed bg-neutral-500" : "bg-software-orange hover:bg-software-orange-hover"
            } ${className}`}
            onClick={handlePostComment}
        >
            Comment
        </button>
    );
};

export default PostCommentBtn;
