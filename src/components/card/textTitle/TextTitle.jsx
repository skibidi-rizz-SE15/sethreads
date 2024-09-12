import React from "react";

const TextTitle = ({ title, className="" }) => {
    const style = `mt-3 text-xl text-white text-clip ${className}`;
    return (<h2 className={style}>{title}</h2>);
}

export default TextTitle