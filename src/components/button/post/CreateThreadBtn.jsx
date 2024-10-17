import React, { useState } from 'react';
import { IoAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';

const CreateThreadBtn = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 200);
    };

    return (
        <Link to={`/create-thread`} className='contents'>
            <button className={`transform transition hover:bg-steadfast rounded-lg duration-200 ease-in-out ${isClicked ? 'scale-75' : 'scale-100'}`} onClick={handleClick}>
                <IoAdd className='text-3xl text-white transition hover:text-software-orange' />
            </button>
        </Link>
    );
}

export default CreateThreadBtn;
