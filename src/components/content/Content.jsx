import React from 'react';
import Header from './Header/Header';
import HighlightSection from './HighlightSection/HighlightCard/HighlightSection';
import ThreadSection from './ThreadSection/ThreadSection';

function Content() {
  return (
    <main className="flex overflow-hidden flex-col px-9 pt-10 mx-auto w-full bg-neutral-800">
    <Header />
    <HighlightSection />
    <ThreadSection />
    </main>
  );
}

export default Content;

