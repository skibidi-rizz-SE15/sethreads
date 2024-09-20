const Logo = ({ hasText=true }) => {
    return (
        hasText
        ?
        <div className="flex">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d8da78db1ff40849a641d3086462423e911d33579caaab958d340cde9701cf2?placeholderIfAbsent=true&apiKey=6c97697ae0354418a18c66f6f8aad447" alt="" className="object-contain shrink-0 self-start aspect-[1.87] w-[58px]" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63b3d1857ca411da165eeff8213e483929388fee54e1d508ae2262a8fa23cd8?placeholderIfAbsent=true&apiKey=6c97697ae0354418a18c66f6f8aad447" alt="Company Logo" className="object-contain shrink-0 max-w-full aspect-[5.15] w-[175px]" />
        </div> 
        :
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d8da78db1ff40849a641d3086462423e911d33579caaab958d340cde9701cf2?placeholderIfAbsent=true&apiKey=6c97697ae0354418a18c66f6f8aad447" alt="" className="flex object-contain shrink-0 aspect-[1.87] min-w-[10rem] w-[10rem]" />
    );
}

export default Logo;