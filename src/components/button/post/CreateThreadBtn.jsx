import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateThreadBtn = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 200);
    };

    return (
        <Link to={`/create-thread`} className='contents'>
            <button className={`transform transition-transform duration-200 ease-in-out ${isClicked ? 'scale-75' : 'scale-100'}`}onClick={handleClick}>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fa42b4965fba9ec659090d50a7cafa271bc0dbc9396b7a24fac04ee2d98049f?placeholderIfAbsent=true&apiKey=6c97697ae0354418a18c66f6f8aad447"
                    alt=""
                    className="object-contain shrink-0 my-auto rounded-md aspect-square w-[30px]"
                />
            </button>
        </Link>
    );
}

export default CreateThreadBtn;
