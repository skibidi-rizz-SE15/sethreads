import React from "react";

function Separator({ className="" }){
    const style = `shrink-0 self-center h-px border border-solid border-neutral-700 ${className}`;
    return <div className={style} />;
}

export default Separator