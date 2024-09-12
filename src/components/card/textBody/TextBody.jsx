import React from "react";

const TextBody = ({ body, className="" }) => {
    const style = `overflow-hidden mt-2 text-sm text-clip text-stone-500 ${className}`;
    return <p className={style}>{body}</p>
}

export default TextBody