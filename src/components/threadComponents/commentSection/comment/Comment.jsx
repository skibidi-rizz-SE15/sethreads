import React, { useState } from "react";
import ReplySection from "./replySection/ReplySection";
import Profile from "../../../card/profile/Profile";
import TextBody from "../../../card/textBody/TextBody";
import ReplyBtn from "../../../button/post/ReplyBtn";
import ToggleReplyBtn from "../../../button/toggle/ToggleReplyBtn";

const Comment = ({name, body, subcomments}) => {
    const [isVisible, setIsVisible] = useState(false);

    function handleOnClick() {
        setIsVisible(!isVisible);
    }

    return (
        <div className="mt-2">
            <Profile name={name}/>
            <div className="pl-[2.225rem]">
                <TextBody body={body} />
                <div className="flex gap-1">
                    {(subcomments.length > 0) && <ToggleReplyBtn number={subcomments.length} handleOnClick={handleOnClick} />}
                    <ReplyBtn />
                </div>
                {isVisible && <ReplySection subcomments={subcomments} />}
            </div>
        </div>
    )
}

export default Comment