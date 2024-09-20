import React from 'react';
import ThreadCard from './threadCard/ThreadCard';
import Separator from '../../separator/Separator';

const ThreadSection = () => {
  const threads = [
    {
      name: "SomeStudent'sName",
      time: "4 days ago",
      title: 'Some Title here maybe "how to make she love me Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum faucibus neque, eget imperdiet ligula dapibus a. Sed eu massa a dolor malesuada pulvinar. Phasellus eget arcu ullamcorper, accumsan neque sed, gravida leo. Maecenas laoreet commodo pulvinar. Nunc quis gravida massa. Donec ornare congue accumsan. Sed a convallis mi. Donec eu risus vel quam facilisis dapibus. Mauris varius tempor arcu at lobortis. Fusce tempus mattis dui, in vestibulum tortor feugiat tincidunt. Duis fringilla lobortis sem, id dapibus quam lacinia id. Pellentesque aliquet aliquam congue. Suspendisse quis diam orci. Maecenas aliquam congue neque, quis accumsan tellus sodales eget. Morbi lacinia est odio, in finibus diam scelerisque nec."',
      body: "I don't know what body should have it here i just want to illustrate it. Lorem ipsum dolor sit amet, consector. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum faucibus neque, eget imperdiet ligula dapibus a. Sed eu massa a dolor malesuada pulvinar. Phasellus eget arcu ullamcorper, accumsan neque sed, gravida leo. Maecenas laoreet commodo pulvinar. Nunc quis gravida massa. Donec ornare congue accumsan. Sed a convallis mi. Donec eu risus vel quam facilisis dapibus. Mauris varius tempor arcu at lobortis. Fusce tempus mattis dui, in vestibulum tortor feugiat tincidunt. Duis fringilla lobortis sem, id dapibus quam lacinia id. Pellentesque aliquet aliquam congue. Suspendisse quis diam orci. Maecenas aliquam congue neque, quis accumsan tellus sodales eget. Morbi lacinia est odio, in finibus diam scelerisque nec. ",
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
        <ThreadCard {...thread} className='min-w-96 w-4/5' />
        {index < threads.length - 1 && (<Separator className='mx-auto w-4/5 min-w-96' />)}
      </React.Fragment>
    ))}
  </section>
  );
}

export default ThreadSection;