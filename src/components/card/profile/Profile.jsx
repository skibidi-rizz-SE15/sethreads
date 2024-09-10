import React from "react";

function Profile({ name, time="" }){
    return (
        <div className="flex gap-2.5 text-sm">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/da1e4bf63962c141c8657868b117ac6c66f46017effdd8b677ebbc75f8cd98fd?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" alt="User Avatar" className="object-contain shrink-0 aspect-square rounded-[100px] w-[25px]" />
          <div className="flex my-auto gap-2">
            <div className="grow text-white">{name}</div>
            { time && <div className="text-neutral-400">{time}</div> }
          </div>
        </div>
    )
}

export default Profile