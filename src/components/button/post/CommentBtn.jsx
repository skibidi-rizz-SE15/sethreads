import React from 'react';

function CommentBtn() {
    return (
        <button className="flex overflow-hidden gap-1 self-end px-2.5 py-2.5 mt-2 mr-6 w-fit text-sm font-medium tracking-normal leading-5 text-center items-center text-white whitespace-nowrap rounded-lg bg-neutral-800 hover:bg-comment-highlight">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f13bec1b6188e12080f057de56f7d5d9096a37c2cb5e66272cc3a877ff656a97?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" alt="Comment Icon" className="object-contain shrink-0 self-start w-5 aspect-square" />
            <span>23</span>
        </button>
    );
}

export default CommentBtn