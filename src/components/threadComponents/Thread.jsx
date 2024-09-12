import React from "react";
import Profile from "../card/profile/Profile";
import TextTitle from "../card/textTitle/TextTitle";
import TextBody from "../card/textBody/TextBody";
import CommentDisplay from "../display/CommentDisplay";
import Separator from "../separator/Separator";
import CommentInput from "./commentInput/CommentInput";
import CommentSection from "./commentSection/CommentSection";

const Thread = () => {
    return (
        <div className="flex flex-col overflow-y-auto px-9 pt-10 mx-auto w-full bg-neutral-800">
            <div>
                <Profile />
                <TextTitle />
                <TextBody />
            </div>
            <CommentDisplay />
            <Separator />
            <div>Comments</div>
            <CommentInput />
            <CommentSection />
        </div>
    );
};

export default Thread