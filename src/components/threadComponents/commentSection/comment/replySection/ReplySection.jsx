import React from "react";
import Reply from "./reply/Reply";

const ReplySection = ({ replies }) => {
    return (
        <div>
            {replies.map((subcomment) => {
                return (
                    <Reply
                        name={`${subcomment.author.name} ${subcomment.author.surname}`}
                        year={subcomment.author.year}
                        body={subcomment.body}
                        time={subcomment.create_at}
                    />
                )
            })}
        </div>
    )
}

export default ReplySection