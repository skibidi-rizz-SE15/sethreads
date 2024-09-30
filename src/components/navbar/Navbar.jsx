import React from 'react';

import PostBtn from '../button/post/CreateThreadBtn';
import Logo from './logo/Logo';
import NavBarProfile from './profile/NavBarProfile';

const Navbar = ({ studentName, studentYear }) => {
    return (
        <header className='col-span-2 flex justify-between items-center overflow-hidden h-20 px-20 py-1 rounded-b-xl border-b-2 border-yellow-600 border-solid bg-eerie-black max-md:px-5'>
            <Logo />
            <div className='flex items-center'>
                <PostBtn />
                <NavBarProfile name={studentName} year={studentYear} />
            </div>
        </header>
    );
}

export default Navbar;