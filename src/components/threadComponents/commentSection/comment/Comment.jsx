import React, { useState } from "react";
import ReplySection from "./replySection/ReplySection";
import Profile from "../../../card/profile/Profile";
import TextBody from "../../../card/textBody/TextBody";
import ReplyBtn from "../../../button/post/ReplyBtn";
import ToggleReplyBtn from "../../../button/toggle/ToggleReplyBtn";
import ReplyEditor from "../../../textEditor/ReplyEditor";
import PostReplyBtn from "../../../button/createReply/PostReplyBtn";

const Comment = ({comment_id, name, year, time, body, subcomments}) => {
    const [isVisible, setIsVisible] = useState(false);

    function handleOnClick() {
        setIsVisible(!isVisible);
    }

    return (
        <div className="mt-2">
            <Profile name={name} year={year} time={time} />
            <div className="ml-[2.625rem]">
                <TextBody body={body} />
                <div className="flex gap-1">
                    {(subcomments.length > 0) && <ToggleReplyBtn number={subcomments.length} handleOnClick={handleOnClick} />}
                    <ReplyBtn />
                </div>
                <div className="flex gap-4 w-full items-center">
                    <ReplyEditor />
                    <PostReplyBtn className="flex text-white w-fit self-end mb-2" />
                </div>
                {isVisible && <ReplySection subcomments={subcomments} />}
            </div>
        </div>
    )
}

export default Comment