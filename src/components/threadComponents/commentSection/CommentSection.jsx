import React from "react";
import Comment from "./comment/Comment";

const CommentSection = () => {
    return (
        <div className="mt-4">
            <Comment />
            <Comment />
            <Comment />
        </div>
    )
}

export default CommentSection