import React from "react";

const Profile = ({ name, year=0, time="", className="" }) => {
    let yearBackground;
    switch(year){
      case 1:
        yearBackground = "bg-purple-500";
        break;
      case 2:
        yearBackground = "bg-blue-500";
        break;
      case 3:
        yearBackground = "bg-yellow-500";
        break;
      case 4:
        yearBackground = "bg-red-500";
        break;
      default:
        yearBackground = "bg-green-500"
    }

    return (
        <div className={`grid grid-cols-[auto,auto] gap-x-2.5 text-sm text-white ${className}`}>
          <img
           loading="lazy" 
           src="https://cdn.builder.io/api/v1/image/assets/TEMP/da1e4bf63962c141c8657868b117ac6c66f46017effdd8b677ebbc75f8cd98fd?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" 
           alt="User Avatar" 
           className={`self-center row-start-1 row-end-${year ? "3" : "2"} object-contain shrink-0 aspect-square rounded-[100px] w-[2rem]`} 
          />
          <div className="flex my-auto gap-2">
            <div className="grow">{name}</div>
            { time && <div className="text-neutral-400">{time}</div> }
          </div>
          {year !== 0 && year && (
            <div className={`w-fit rounded-lg text-xs px-3 ${yearBackground}`}>Year {year}</div>
          )}
        </div>
    )
}

export default Profile