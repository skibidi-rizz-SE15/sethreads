import React from "react";
import Reply from "./reply/Reply";

const ReplySection = () => {
    return (
        <div>
            <Reply name={"dummy user"} body={"bla bla reply bla"} />
            <Reply name={"michael jackson"} body={"hee reply hee hee hee"} />
            <Reply name={"skibidop"} body={"dop dop yes yes hehehe ha"} />
        </div>
    )
}

export default ReplySection