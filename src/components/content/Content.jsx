import React from 'react';
import Header from './Header/Header';
import HighlightSection from './HighlightSection/HighlightCard/HighlightSection';
import ThreadSection from './ThreadSection/ThreadSection';

function Content() {
  return (
    <main className="flex flex-col m-auto">
      <div className="flex overflow-hidden flex-col px-9 pt-10 mx-auto w-full bg-neutral-800 max-md:px-5 max-md:max-w-full">
        <Header />
        <HighlightSection />
        <ThreadSection />
      </div>
    </main>
  );
}

export default Content;

