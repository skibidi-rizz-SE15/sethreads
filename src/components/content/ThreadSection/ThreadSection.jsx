import React from 'react';
import ThreadCard from './ThreadCard/ThreadCard';
function ThreadSection() {
  const threads = [
    {
      name: "SomeStudent'sName",
      time: "4 days ago",
      title: 'Some Title here maybe "how to make she love me"',
      body: "I don't know what body should have it here i just want to illustrate it. Lorem ipsum dolor sit amet, consector.",
      imageHeight: "580px"
    },
    {
      name: "SomeStudent'sName",
      time: "4 days ago",
      title: 'Some Title here maybe "how to make she love me"',
      body: "I don't know what body should have it here i just want to illustrate it. Lorem ipsum dolor sit amet, consector.",
      imageHeight: "161px"
    }
  ];

return (
  <section>
    {threads.map((thread, index) => (
      <React.Fragment key={index}>
        <ThreadCard {...thread} />
        {index < threads.length - 1 && (
          <div className="shrink-0 self-center mt-12 max-w-full h-px border border-solid border-neutral-700 w-[1075px] max-md:mt-10" />
        )}
      </React.Fragment>
    ))}
  </section>
  );
}

export default ThreadSection;