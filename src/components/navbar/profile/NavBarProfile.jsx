import React from 'react'

const NavBarProfile = ({ name, year}) => {
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
    <div className='grid grid-cols-[auto,auto] gap-x-6 gap-y-1 mb-1 h-fit text-white text-right ml-10'>
        <p>{name}</p>
        <img
           loading="lazy" 
           src="https://cdn.builder.io/api/v1/image/assets/TEMP/da1e4bf63962c141c8657868b117ac6c66f46017effdd8b677ebbc75f8cd98fd?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" 
           alt="User Avatar" 
           className={`self-center col-start-2 row-start-1 row-end-3 object-contain shrink-0 aspect-square rounded-[100px] w-[2rem]`} 
        />
        <p className={`justify-self-end px-3 w-fit text-sm rounded-lg ${yearBackground}`}>Year {year}</p>
    </div>
  )
}

export default NavBarProfile