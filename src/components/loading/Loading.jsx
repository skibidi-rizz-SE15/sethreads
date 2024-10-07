import React, { useEffect, useState } from "react";

const Loading = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <main className={`flex flex-col items-center justify-center overflow-y-auto w-full h-screen bg-neutral-800 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d8da78db1ff40849a641d3086462423e911d33579caaab958d340cde9701cf2?placeholderIfAbsent=true&apiKey=6c97697ae0354418a18c66f6f8aad447"
                alt="Loading"
                className="object-contain aspect-[1.87] w-[120px] animate-pulse"
            />
            {/* <p className="pt-3 mt-4 text-lg text-gray-300 typing-animation">Loading</p> */}
        </main>
    );
}

export default Loading;
