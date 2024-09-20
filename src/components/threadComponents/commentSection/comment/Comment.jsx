import React from "react";
import ReplySection from "./replySection/ReplySection";
import Profile from "../../../card/profile/Profile";
import TextBody from "../../../card/textBody/TextBody";
import ReplyBtn from "../../../button/post/ReplyBtn";
import ToggleReplyBtn from "../../../button/toggle/ToggleReplyBtn";

const Comment = () => {
    return (
        <div className="mt-2">
            <Profile name={"dummy dummy"}/>
            <div className="pl-[2.225rem]">
                <TextBody body={'bla bla talk bla comment harewifhweiof hwlikgfhwielgfi wlgfikpwrhgflwhgfiolerh goiewrhgliehrgiehgoiwhr giwheiowhfipwhgfoiw hefiowhfoiwhfooiwegfwkilug hewrilghwr ioghwroighw righwigh wpghwopgfhw roiroghwer ligheroghw roighewrighaerpighewrpigwipghwrpigwpghwgowhghgpohwpoaaaaaaa d'} />
                <div className="flex gap-1">
                    <ToggleReplyBtn />
                    <ReplyBtn />
                </div>
                <ReplySection />
            </div>
        </div>
    )
}

export default Comment