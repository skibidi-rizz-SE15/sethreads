import React from "react";
import parse from 'html-react-parser';
import options from "../../../utilities/TiptapContentDisplay";

const TextBody = ({ body, className="" }) => {
    return (<div className={`overflow-hidden text-sm text-clip text-stone-300 ${className}`}>{parse(body, options)}</div>)
}

export default TextBody