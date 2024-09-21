import React from 'react';

const Header = ({ CourseName }) => {
  return (
    <header className='max-w-full'>
      <div className="flex mx-6 max-w-full h-32 rounded-3xl bg-neutral-700" />
      <h1 className="self-start mt-9 ml-6 text-5xl font-bold text-white">{CourseName}</h1>
    </header>
  );
}

export default Header;