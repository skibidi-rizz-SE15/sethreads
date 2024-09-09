import React from 'react';

import PostBtn from '../button/post/PostBtn';
import Logo from './logo/Logo';
import Profile from './profile/Profile';

function Navbar() {
    return (
        <header className='col-span-2 flex justify-between items-center overflow-hidden px-20 py-1 rounded-b-xl border-b-2 border-yellow-600 border-solid bg-eerie-black max-md:px-5'>
            <Logo />
            <div className='flex items-center'>
                <PostBtn />
                <Profile />
            </div>
        </header>
    );
}

export default Navbar;