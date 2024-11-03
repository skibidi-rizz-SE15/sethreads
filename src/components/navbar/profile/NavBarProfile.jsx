import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBarProfile = ({ name, year, resetState }) => {
  const [showButton, setShowButton] = useState(false);
  const imgRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  let yearBackground;
  switch(year){
    case -1:
      yearBackground = "bg-red-500";
      break;
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
      yearBackground = "bg-green-500";
      break;
    default:
      yearBackground = "bg-teal-500";
  }

  const handleClickOutside = (event) => {
    if (buttonRef && imgRef.current && !imgRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
      setShowButton(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative grid grid-cols-[auto,auto] gap-x-6 gap-y-1 mb-1 h-fit text-white text-right ml-10'>
      <p>{name}</p>
      <img
        ref={imgRef}
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/da1e4bf63962c141c8657868b117ac6c66f46017effdd8b677ebbc75f8cd98fd?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5"
        alt="User Avatar"
        className={`self-center col-start-2 row-start-1 row-end-3 object-contain shrink-0 aspect-square rounded-[100px] w-[2rem] hover:cursor-pointer`}
        onClick={() => setShowButton((prev) => !prev)}
      />
      {(year === -1 || year) && (<p className={`justify-self-end px-3 w-fit text-sm rounded-lg ${yearBackground}`}>{(year === -1) ? `ADMIN` : `Year ${year}`}</p>)}
      {showButton && (
        <button
          ref={buttonRef}
          className="absolute top-[85%] left-[93%] px-2 py-2 z-10 w-fit text-sm text-white text-nowrap rounded-md border border-software-orange bg-eerie-black hover:bg-general-highlight"
          role="menuitem"
          onClick={() => { 
            localStorage.clear();
            resetState();
            navigate("/login");
          }}
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default NavBarProfile;
