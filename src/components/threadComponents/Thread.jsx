import React, { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import axios from "axios";

import Profile from "../card/profile/Profile";
import TextTitle from "../card/textTitle/TextTitle";
import TextBody from "../card/textBody/TextBody";
import CommentDisplay from "../display/CommentDisplay";
import Separator from "../separator/Separator";
import CommentInput from "./commentInput/CommentInput";
import CommentSection from "./commentSection/CommentSection";
import BackToCourseBtn from "../button/back/BackToCourseBtn";
import AlertBox from "../alertbox/AlertBox";


import { useParams } from "react-router-dom";


let useClickOutside = (handler) => {
    let domNode = useRef();

    useEffect(() => {
        let maybeHandler = (event) => {
            if (!domNode.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", maybeHandler);

        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    });

    return domNode;
}

const Thread = ({ fromHome, studentId }) => {
    const { courseId, threadId } = useParams();
    const [threadData, setThreadData] = useState({});
    const [numComment, setNumComment] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/${fromHome ? `home/get-thread?thread_id=${threadId}` : `thread/get-thread?thread_id=${threadId}&course_id=${courseId}`}`, {
            headers: {
                "x-token": localStorage.getItem("token")
            }
        })
        .then((res) => {
            setThreadData(res.data);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [courseId, threadId]);

    function deleteThread() {
        axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/thread/delete-thread?thread_id=${threadId}`, {
            headers: {
                "x-token": localStorage.getItem("token")
            }
        })
        .then((res) => {
            console.log(res);
            window.location.href = fromHome ? "/home" : `/course/${courseId}`;
        }).catch((err) => {
            console.log(err);
        });
    }

    let domNode = useClickOutside(() => {
        setIsOpen(false);
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative flex overflow-y-auto w-full">
            <BackToCourseBtn toHome={fromHome}/>
            <div className="flex flex-col px-9 py-10 mx-auto w-4/5 h-max bg-neutral-800">
                <div className="w-full">
                    <div className="flex">
                        <Profile name={`${threadData.author.name} ${threadData.author.surname}`} time={threadData.create_at} />
                        <div ref={domNode} className="flex-1 flex justify-end">
                            { studentId === threadData.author.student_id && 
                            (<div>
                                <div>
                                    <CiMenuKebab className="text-xl text-white cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}/>
                                </div>
                                {isOpen && (
                                    <div className="absolute right-20 z-10 w-48 mt-2 origin-top-right bg-eerie-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <div className="py-1" role="none">
                                            <button className="block w-full px-4 py-2 text-sm text-gray-600 text-left" role="menuitem" disabled={true}>Edit</button>
                                            <button onClick={() => setIsAlertOpen(true)} className="block w-full px-4 py-2 text-sm text-white text-left hover:bg-general-highlight" role="menuitem">Delete</button>
                                        </div>
                                    </div>
                                )}
                            </div>)
                            }
                        </div>
                    </div>
                    <TextTitle title={threadData.title} />
                    <TextBody body={threadData.body} />
                </div>
                <CommentDisplay number={numComment}/>
                <Separator className="w-full my-6" />
                <div className="text-xl text-white">Comments</div>
                <CommentInput />
                <CommentSection thread_id={threadId} setNumComment={setNumComment} isHome={fromHome} />
            </div>
            <AlertBox isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
                <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this thread?</p>
                <div className="mt-4 flex justify-end">
                    <button onClick={() => setIsAlertOpen(false)} className="mr-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-500">Cancel</button>
                    <button onClick={deleteThread} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Delete</button>
                </div>
            </AlertBox>
        </div>
        
    );
};

export default Thread