import React from "react";
import parse from 'html-react-parser';
import options from "../../../utilities/TiptapContentDisplay";

const TextBody = ({ body, className="" }) => {
    return <p className={`overflow-hidden mt-2 text-sm text-clip text-stone-500 ${className}`}>{parse(body, options)}</p>
}

export default TextBody