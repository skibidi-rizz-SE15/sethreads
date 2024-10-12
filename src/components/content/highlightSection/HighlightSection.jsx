import HighlightCard from "./highlightCard/HighlightCard";

import { Link } from "react-router-dom";

const HighlightSection = ({ highlightThreads, courseId, isHomePage }) => {
    // const highlights = [
    //   { title: 'Lorem ipsum dolor sit amet, consector dfgldf dgdlgdf f fdk kffdg dfk fdmgmdfgd ff f d d dllkklm', taName: 'TAs Name' },
    //   { title: 'Lorem ipsum dolor sit amet, consector', taName: 'TAs Name' },
    //   { title: 'Lorem ipsum dolor sit amet, consector', taName: 'TAs Name' },
    // ];

    return (
        <section>
          <div className="flex gap-4 self-start mb-4 text-2xl font-medium text-white whitespace-nowrap">   
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3117b074e17582b809fc5215b91fa303a269ef8867f5485b6d1dcc4b7fd50eeb?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" alt="Highlight Icon" className="object-contain shrink-0 my-auto w-6 aspect-square" />    
            <div className="basis-auto">Highlight</div>   
          </div>    
          <div className="flex flex-wrap gap-5 mx-6 max-w-full max-md:flex-col">   
            {highlightThreads.map((thread) => (
              <Link to={`${isHomePage ? `thread/${thread.id}` : `/course/${courseId}/thread/${thread.id}`}`} style={{display: 'contents' }} key={thread.id}>  
                <HighlightCard key={thread.id} title={thread.title} taName={`${thread.author.name} ${thread.author.surname}`} year={thread.author.year} comments={thread.comments} className="flex-1 w-full min-w-72 max-w-[33%] max-[300px]:max-w-full" /> 
              </Link>
            ))}   
          </div>    
        </section>   
      );  
}

export default HighlightSection;