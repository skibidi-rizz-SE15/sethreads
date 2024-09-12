import React from "react";
import ReplySection from "./replySection/ReplySection";
import Profile from "../../../card/profile/Profile";
import TextBody from "../../../card/textBody/TextBody";
import ReplyBtn from "../../../button/post/ReplyBtn";

const Comment = () => {
    return (
        <div>
            <Profile name={"dummy dummy"}/>
            <TextBody body={"bla bla talk bla comment ha"} />
            <ReplyBtn />
            <ReplySection />
        </div>
    )
}

export default Comment