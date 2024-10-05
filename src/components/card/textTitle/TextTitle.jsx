import React from "react";
import parse from 'html-react-parser';

const TextTitle = ({ title, className="" }) => {
    return (<h2 className={`overflow-hidden mt-3 text-xl text-white text-clip ${className}`}>{parse(title)}</h2>);
}

export default TextTitle