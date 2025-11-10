import React from 'react'

const Warrper = () => {
  return (
    <div className='relative h-[736px] w-[600px] top-6 bg-[#1476B7] rounded-lg overflow-hidden'>
        <div
          className='absolute w-[49px] h-[49px] rounded-full z-0'
          style={{
            top: "260px",
            left: "287px",
            background: "linear-gradient(to bottom right,#FFA679,#FA8443)",
            filter: "blur(4px)",
            boxShadow: "0 0 10px 10px rgba(216, 82, 9, 0.6)"
          }}
        ></div>
        <div className='absolute w-[800.09px] h-[870.89px] top-[190px]'>
          <img src="1.svg" />
        </div>

        <div className='absolute bottom-0 left-[410px]'>
          <img src="Elipise.svg" />
        </div>

        <div
          className='absolute w-[500px] h-[620px] border-2 rounded-xl inset-0 backdrop-blur-md border-[#B7E9F640]'
          style={{
            top: "50%",
            left: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            transform: "translate(-50%,-50%)"
          }}
        >
          <div className='w-[500px] h-[189px] mx-auto mt-[47px]'>
            <h1 className='text-white text-[45px] leading-[1.2] tracking-[1%] font-semibold text-center'>
              suitable careers and occupations to start{" "}
              <span className='flex flex-start ml-[49px]'>their career!</span>
            </h1>
          </div>

          <div className='absolute left-[360px] top-[39px] transform -translate-x-1/2'>
            <img
              src="dot.svg"
              className="w-[650px] h-[580px] object-contain"
              style={{ maxWidth: 'none', maxHeight: 'none' }}
            />
          </div>

          <div className="absolute bottom-10 left-[90px] flex gap-2 z-20 mb-5">
            <div className="w-12 h-4 bg-white rounded-md"></div>
            <div className="w-4 h-4 bg-gray-100 rounded-md opacity-60"></div>
            <div className="w-4 h-4 bg-gray-100 rounded-md opacity-60"></div>
          </div>
        </div>
      </div>
  )
}

export default Warrper