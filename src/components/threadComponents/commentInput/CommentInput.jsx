import React from "react";

const CommentInput = () => {
    return (
        <form className="self-end px-8 py-4 mt-12 max-w-full text-base font-medium tracking-normal leading-none text-center rounded-3xl border border-solid bg-neutral-800 border-zinc-600 text-zinc-600 w-full">
            <label htmlFor="commentInput" className="sr-only">Add a comment</label>
            <input
                id="commentInput"
                type="text"
                placeholder="Add a comment"
                className="w-full bg-transparent outline-none"
            />
        </form>
    )
}

export default CommentInput