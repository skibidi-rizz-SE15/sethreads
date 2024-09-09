import HighlightCard from "./highlightCard/HighlightCard";

function HighlightSection() {
    const highlights = [
      { title: 'Lorem ipsum dolor sit amet, consector', comments: 90, taName: 'TAs Name' },
      { title: 'Lorem ipsum dolor sit amet, consector', comments: 90, taName: 'TAs Name' },
      { title: 'Lorem ipsum dolor sit amet, consector', comments: 90, taName: 'TAs Name' },
    ];

    return (
        <section>
          <div className="flex gap-4 self-start mb-4 text-2xl font-medium text-white whitespace-nowrap">   
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3117b074e17582b809fc5215b91fa303a269ef8867f5485b6d1dcc4b7fd50eeb?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" alt="Highlight Icon" className="object-contain shrink-0 my-auto w-6 aspect-square" />    
            <div className="basis-auto">Highlight</div>   
          </div>    
          <div className="mx-6 max-w-full">   
            <div className="flex gap-5 max-md:flex-col">   
              {highlights.map((highlight, index) => (  
                <HighlightCard key={index} {...highlight} />  
              ))}   
            </div>    
          </div>
          <div className="shrink-0 my-6 h-px border border-solid border-neutral-700 max-md:mt-10 max-md:max-w-full" />
        </section>   
      );  
}

export default HighlightSection;