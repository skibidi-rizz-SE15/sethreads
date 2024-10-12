import React from "react";
import Profile from "../../../../../card/profile/Profile";
import TextBody from "../../../../../card/textBody/TextBody";

const Reply = ({ name, year, time="", body }) => {
    return (
        <article className="flex overflow-hidden flex-col self-center mx-auto mt-2 min-w-96 w-full">
            <Profile name={name} year={year} time={time}/>
            <div className="ml-[2.625rem]">
                <TextBody body={body} className="-mt-1 -mb-2" />
            </div>
        </article>
    )
}

export default Reply