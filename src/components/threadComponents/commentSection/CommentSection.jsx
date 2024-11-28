import React, { useState, useEffect } from "react";
import hljs from "highlight.js";
import axios from "axios";

import Comment from "./comment/Comment";

const CommentSection = ({ thread_id, isHome, isPostComment, studentId, triggerFetch, isBottom, onPost, onPostCleanup, onBottomCleanup, isAdmin, onDeleteComment }) => {
    const [comments, setComments] = useState([]);
    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        hljs.highlightAll();
    }, []);

    useEffect(() => {
        async function fetchDataFirst() {
            try {
                const response = await fetchData();
                setComments(response.data);
                setOffset(response.data.length);   
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchDataFirst();
    }, [thread_id]);

    useEffect(() => {
        async function fetchDataOnPost() {
            try {
                if (isPostComment) {
                    const response = await handlefetchDataOnPost();
                    setComments((prev) => [response.data, ...prev]);
                    setOffset((prev) => prev + 1);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchDataOnPost();
        return () => {
            onPostCleanup();
        }
    }, [onPost]);

    useEffect(() => {
        async function fetchDataOnBottom() {
            try {
                if (isBottom && !isPostComment) {
                    const response = await fetchData();
                    setComments((prev) => [...prev, ...response.data]);
                    setOffset((prev) => prev + response.data.length);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchDataOnBottom();
        return () => {
            onBottomCleanup();
        }
    }, [triggerFetch]);
    
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/comment/get-comments?thread_id=${thread_id}&limit=${limit}&offset=${offset}`, {
                headers: {
                    "x-token": localStorage.getItem("token")
                }
            });
            return response;
        } catch (error) {
            console.error("Error in fetchData:", error);
            throw error;
        }
    };

    const handlefetchDataOnPost = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/comment/get-last-comment?thread_id=${thread_id}`, {
                headers: {
                    "x-token": localStorage.getItem("token")
                }
            });
            return response
        } catch (error) {
            console.error("Error in fetchDataOnPost:", error);
            throw error;
        }
    }

    function handlePostReply(newSubcomment) {
        setComments(prevComments => 
            prevComments.map(comment => 
              comment.id === newSubcomment.reply_of 
                ? {
                    ...comment,
                    replies: [...comment.replies, newSubcomment]
                  }
                : comment
            )
          );
    }
    
    function handleOnDelete(commentId) {
        onDeleteComment(commentId);
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    }

    return (
        <div className="mt-4">
            {comments.length === 0 ? <div className="text-white text-center">No comments found</div> : comments.map((comment) => {
                return (
                    <Comment
                        key={comment.id}
                        commentId={comment.id}
                        name={`${comment.author.name} ${comment.author.surname}`}
                        year={comment.author.year}
                        time={comment.create_at}
                        body={comment.body}
                        replies={comment.replies}
                        fromHome={isHome}
                        studentId={studentId}
                        onPostReply={handlePostReply}
                        onDelete={handleOnDelete}
                        isLigit={(comment.author.id === studentId) || isAdmin}
                    />
                )
            })}
        </div>
    )
}

export default CommentSection