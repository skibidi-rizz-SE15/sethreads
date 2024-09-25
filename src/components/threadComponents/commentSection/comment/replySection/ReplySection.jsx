import React from "react";
import Reply from "./reply/Reply";

const ReplySection = ({ subcomments }) => {
    return (
        <div>
            {subcomments.map((subcomment) => {
                return (
                    <Reply
                        name={subcomment.author.name}
                        body={subcomment.reply_data}
                    />
                )
            })}
        </div>
    )
}

export default ReplySection