import React from 'react'

const Header = () => {
  return (
    <div className='flex fixed w-full z-10  top-0 items-center justify-between p-5 bg-[#F8FAFC]'>
        <header className="flex items-center gap-3">
            <img src="vector.svg" alt="logo" className="w-10 h-10 sm:w-12 sm:h-12" />
            <h1 className="text-[20px] sm:text-[23.69px] text-[#1476B7] font-semibold leading-7">
              My Career <br /> Guidance
            </h1>
          </header>
          <div className='flex w-[1400px] justify-between items-center'>
          <p className='text-[#1476B7] text-[18px]'>Hello <span className='font-bold'>Bruno Fernandes</span>, welcome back!</p>
        <div className="bg-blue-600 rounded-lg p-2 flex items-center space-x-3 w-[263px] h-[60px] max-w-sm">
        <img
        src="" 
        alt=""
        className="w-10 h-10 rounded-md object-cover border border-gray-400"
       />
      <div className="text-white">
        <h3 className="font-semibold text-lg">Bruno Fernandes</h3>
        <p className="text-sm opacity-90">Bruno@gmail.com</p>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Header