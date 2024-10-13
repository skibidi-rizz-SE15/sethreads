import React, { useEffect } from "react";
import parse from 'html-react-parser';
import options from "../../../utilities/TiptapContentDisplay";
import hljs from "highlight.js";

const TextBody = ({ body, className="" }) => {
    useEffect(() => {
        hljs.highlightAll();
    }, [body]);
    return (<div className={`overflow-hidden text-sm text-clip text-stone-300 ${className}`}>{parse(body, options)}</div>)
}

export default TextBody