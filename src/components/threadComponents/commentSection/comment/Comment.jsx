import React from "react";
import ReplySection from "./replySection/ReplySection";
import Profile from "../../../card/profile/Profile";
import TextBody from "../../../card/textBody/TextBody";
import ReplyBtn from "../../../button/post/ReplyBtn";

const Comment = () => {
    return (
        <div className="mt-2">
            <Profile name={"dummy dummy"}/>
            <TextBody body={'bla bla talk bla comment harewifhweiof hwlikgfhwielgfi wlgfikpwrhgflwhgfiolerh goiewrhgliehrgiehgoiwhr giwheiowhfipwhgfoiw hefiowhfoiwhfooiwegfwkilug hewrilghwr ioghwroighw righwigh wpghwopgfhw roiroghwer ligheroghw roighewrighaerpighewrpigwipghwrpigwpghwgowhghgpohwpoaaaaaaa d'} />
            <ReplyBtn />
            <ReplySection />
        </div>
    )
}

export default Comment