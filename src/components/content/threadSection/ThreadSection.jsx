import React from 'react';
import ThreadCard from './threadCard/ThreadCard';
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
      imageHeight: "580px"
    },
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
      imageHeight: "580px"
    },
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
      imageHeight: "580px"
    },
    {
      name: "SomeStudent'sName",
      time: "4 days ago",
      title: 'Some Title here maybe "how to make she love me"',
      body: "I don't know what body should have it here i just want to illustrate it. Lorem ipsum dolor sit amet, consector.",
      imageHeight: "580px"
    },
  ];

return (
  <section>
    {threads.map((thread, index) => (
      <React.Fragment key={index}>
        <ThreadCard {...thread} />
        {index < threads.length - 1 && (
          <div className="shrink-0 self-center mx-auto w-4/5 min-w-96 h-px border border-solid border-neutral-700" />
        )}
      </React.Fragment>
    ))}
  </section>
  );
}

export default ThreadSection;