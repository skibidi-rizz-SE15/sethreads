import React from "react";
import Profile from "../../../../card/profile/Profile";
import TextBody from "../../../../card/textBody/TextBody";
import ReplyBtn from "../../../../button/post/ReplyBtn";

const Reply = ({ name, time, body }) => {
    return (
        <article className="flex overflow-hidden flex-col self-center pt-6 pb-3.5 mx-auto my-1 rounded-3xl bg-neutral-800 hover:bg-general-highlight min-w-96 w-4/5 max-md:mt-10">
            <div className="flex flex-col items-start mx-6 w-full max-md:px-5 max-md:max-w-full">
                <Profile name={name} time={time}/>
                <TextBody body={body} />
            </div>
            <ReplyBtn />
        </article>
    )
}

export default Reply