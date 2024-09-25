import React, { useEffect, useState } from "react";
import axios from "axios";

import Profile from "../card/profile/Profile";
import TextTitle from "../card/textTitle/TextTitle";
import TextBody from "../card/textBody/TextBody";
import CommentDisplay from "../display/CommentDisplay";
import Separator from "../separator/Separator";
import CommentInput from "./commentInput/CommentInput";
import CommentSection from "./commentSection/CommentSection";
import BackToCourseBtn from "../button/back/BackToCourseBtn";


import { useParams } from "react-router-dom";

const Thread = () => {
    const { courseId, threadId } = useParams();
    const [threadData, setThreadData] = useState({});
    const [numComment, setNumComment] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/thread/get-thread?thread_id=${threadId}&course_id=${courseId}`, {
            headers: {
                "x-token": localStorage.getItem("token")
            }
        })
        .then((res) => {
            console.log(res.data);
            setThreadData(res.data);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [courseId, threadId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative flex overflow-y-auto w-full">
            <BackToCourseBtn />
            <div className="flex flex-col px-9 py-10 mx-auto w-4/5 h-max bg-neutral-800">
                <div className="w-full">
                    <Profile name={`${threadData.author.name} ${threadData.author.surname}`} time={threadData.create_at} />
                    <TextTitle title={threadData.title} />
                    <TextBody body={threadData.body} />
                </div>
                <CommentDisplay number={numComment}/>
                <Separator className="w-full my-6" />
                <div className="text-xl text-white">Comments</div>
                <CommentInput />
                <CommentSection thread_id={threadId} setNumComment={setNumComment} />
            </div>
        </div>
        
    );
};

export default Thread