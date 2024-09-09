import React from 'react';

function Header() {
  return (
    <header>
      <div className="flex shrink-0 mr-4 ml-6 max-w-full h-32 rounded-3xl bg-neutral-700 w-[1501px] max-md:mr-2.5" />
      <h1 className="self-start mt-9 ml-6 text-5xl font-bold text-white max-md:ml-2.5 max-md:text-4xl">Subject1</h1>
      <div className="shrink-0 mt-11 h-px border border-solid border-neutral-700 max-md:mt-10 max-md:max-w-full" />
    </header>
  );
}

export default Header;