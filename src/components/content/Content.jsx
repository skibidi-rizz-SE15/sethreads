import React from 'react';
import Header from './header/Header';
import HighlightSection from './highlightSection/HighlightSection';
import ThreadSection from './threadSection/ThreadSection';

function Content() {
  return (
    <main className="flex flex-col overflow-y-auto px-9 pt-10 mx-auto w-full bg-neutral-800">
      <Header />
      <HighlightSection />
      <ThreadSection />
    </main>
  );
}

export default Content;
