import React from 'react'

const NavBarProfile = ({ name, year}) => {
  return (
    <div className='text-white text-right self-start ml-10 flex'>
        <div className='mr-6'>
            <p>{name}</p>
            <p>Year {year}</p>
        </div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/79d08cb0e6ffbebc8bce7d51c534faeb056cb7b1546fecb0d62559b97441ddc4?placeholderIfAbsent=true&apiKey=6c97697ae0354418a18c66f6f8aad447" alt="User avatar" className="object-contain shrink-0 my-auto aspect-[1.03] rounded-[100px] w-[30px]" />
    </div>
  )
}

export default NavBarProfile