import React from "react";

const TextBody = ({ body, className="" }) => {
    return <p className={`overflow-hidden mt-2 text-sm text-clip text-stone-500 ${className}`}>{body}</p>
}

export default TextBody