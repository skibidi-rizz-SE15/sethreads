import React from "react";

const CommentDisplay = ({ number }) => {
    return (
        <div className="flex gap-1.5 p-2.5 text-sm font-medium items-center text-white rounded-lg hover:bg-comment-highlight">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f13bec1b6188e12080f057de56f7d5d9096a37c2cb5e66272cc3a877ff656a97?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" alt="Comment Icon" className="min-w-5" />
            <div>{number}</div>
        </div>
    )
}

export default CommentDisplay