import React, { useState, useEffect } from "react";
import axios from "axios";

import Comment from "./comment/Comment";

const CommentSection = ({ thread_id, setNumComment, isHome }) => {
    const [comments, setComments] = useState([]);
    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/${isHome ? (`home-comment/get-comments?home_id=${thread_id}`) : (`comment/get-comments?thread_id=${thread_id}`)}&limit=${limit}&offset=${offset}`,{
            headers: {
                "x-token": localStorage.getItem("token")
            }
        })
        .then((res) => {
            setComments(res.data);
            setNumComment(res.data.length);
        }).catch((err) => {
            console.log(err);
        })
    }, [thread_id])
    
    return (
        <div className="mt-4">
            {comments.map((comment) => {
                return (
                    <Comment
                        key={comment.id}
                        name={comment.author.name}
                        body={comment.comment_data}
                        subcomments={comment.subcomments}
                    />
                )
            })}
        </div>
    )
}

export default CommentSection