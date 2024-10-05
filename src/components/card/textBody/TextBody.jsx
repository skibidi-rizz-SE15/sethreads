import React from "react";
import parse from 'html-react-parser';

const TextBody = ({ body, className="" }) => {
    return <p className={`overflow-hidden mt-2 text-sm text-clip text-stone-500 ${className}`}>{parse(body)}</p>
}

export default TextBody