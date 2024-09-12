import React from "react";
import Profile from "../card/profile/Profile";
import TextTitle from "../card/textTitle/TextTitle";
import TextBody from "../card/textBody/TextBody";
import CommentDisplay from "../display/CommentDisplay";
import Separator from "../separator/Separator";
import CommentInput from "./commentInput/CommentInput";
import CommentSection from "./commentSection/CommentSection";

const Thread = () => {
    let title = "Title of Thread bla bla ha ha";
    let body = "lorem bla bla bla lorem bla bla bla lorem bla bla bla lorem bla bla bla lorem bla bla bla lorem bla bla bla ";

    return (
        <div className="flex flex-col overflow-y-auto px-9 pt-10 mx-auto w-full bg-neutral-800">
            <div className="w-full">
                <Profile name={"Yapperson Yappington"} time="6 hours ago" />
                <TextTitle title={title} />
                <TextBody body={body} />
            </div>
            <CommentDisplay />
            <Separator className="w-full" />
            <div className="text-xl text-white">Comments</div>
            <CommentInput />
            <CommentSection />
        </div>
    );
};

export default Thread