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
        <div className="flex overflow-y-auto w-full">
            <div className="flex flex-col px-9 py-10 mx-auto w-4/5 h-max bg-neutral-800">
                <div className="w-full">
                    <Profile name={"Yapperson Yappington"} time="6 hours ago" />
                    <TextTitle title={title} />
                    <TextBody body={body} />
                </div>
                <CommentDisplay />
                <Separator className="w-full my-6" />
                <div className="text-xl text-white">Comments</div>
                <CommentInput />
                <CommentSection />
            </div>
        </div>
        
    );
};

export default Thread