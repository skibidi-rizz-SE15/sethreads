import React from "react";

const TextTitle = ({ title, className="" }) => {
    return (<h2 className={`overflow-hidden mt-3 text-xl text-white text-clip ${className}`}>{title}</h2>);
}

export default TextTitle