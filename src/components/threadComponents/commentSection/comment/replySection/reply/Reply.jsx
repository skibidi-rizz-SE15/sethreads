import React from "react";
import Profile from "../../../../../card/profile/Profile";
import TextBody from "../../../../../card/textBody/TextBody";
import ReplyBtn from "../../../../../button/post/ReplyBtn";

const Reply = ({ name, year, time="", body }) => {
    return (
        <article className="flex overflow-hidden flex-col self-center mx-auto mt-2 min-w-96 w-full">
            <Profile name={name} year={year} time={time}/>
            <div className="ml-[2.625rem]">
                <TextBody body={body} />
                <ReplyBtn className="self-start" />
            </div>
        </article>
    )
}

export default Reply