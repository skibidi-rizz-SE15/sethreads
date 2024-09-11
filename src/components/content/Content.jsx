import React from 'react';
import Header from './header/Header';
import HighlightSection from './highlightSection/HighlightSection';
import ThreadSection from './threadSection/ThreadSection';
import Separator from '../separator/Separator';

const Content = () => {
  return (
    <main className="flex flex-col overflow-y-auto px-9 pt-10 mx-auto w-full bg-neutral-800">
      <Header />
      <Separator className='my-6 w-full max-w-full' />
      <HighlightSection />
      <Separator className='my-6 w-full max-w-full' />
      <ThreadSection />
    </main>
  );
}

export default Content;
