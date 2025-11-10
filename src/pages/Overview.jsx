import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import img8 from "/Search.svg";
import img9 from '/Studaydiv.svg'
import img10 from '/div.svg'
import img11 from '/Coverlatter1.svg'
import img12 from '/MyGoal1.svg'
import img13 from '/MyGoal2.svg'
import img14 from '/cdo.svg'
import img15 from '/self.svg'
import img16 from '/self1.svg'
import img17 from '/education1.svg'
import img18 from '/quiz.svg'
const Overview = () => {
  const [showall ,setShowAll] =useState(false)
  const quizzes = [
    { id: 1, title: "Quiz 01", desc: "Lorem ipsum is a place" },
    { id: 2, title: "Quiz 02", desc: "Lorem ipsum is a place" },
    { id: 3, title: "Quiz 03", desc: "Lorem ipsum is a place" },
    { id: 4, title: "Quiz 04", desc: "Lorem ipsum is a place" },
    { id: 5, title: "Quiz 05", desc: "Lorem ipsum is a place" },
    { id: 6, title: "Quiz 06", desc: "Lorem ipsum is a place" },
  ];

   const visibleQuizzes = showall ? quizzes : quizzes.slice(0, 2);
  return (
    <div className=" z-0 pt-20 ml-20 flex p-1">
      <div className="w-[70%] flex flex-col pr-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-semibold">Career Guidance</h1>
          <div className="relative">
            <img
              src={img8}
              alt="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-12 pr-4 py-2 border-gray-400 focus:outline-none w-32 placeholder:text-gray-300"
            />
          </div>
        </div>
        <div className='w-full flex flex-wrap gap-5 mt-9'>
          <Link to='/dashboard/cadcalculator' className=' w-[48%]'>
            <div className='bg-[#8AC53E] h-[210px] rounded-3xl relative'>
            <img src={img14} alt="" className='absolute left-0 top-0'/>
            <div className='flex flex-col ml-10 pt-3'>
             <h1 className='font-semibold text-[30px] text-white'>CAO Point Calculator</h1>
             <p className='text-white'>Final score is displayed</p>
            </div>
          </div>
          </Link>
           <Link to='/dashboard/mygoal' className='w-[48%]'>
           <div className='bg-[#ADBEC4]  h-[210px] rounded-3xl relative'>
            <img src={img13} alt="" className='absolute left-0 top-0 z-0'/>
             <img src={img12} alt="" className='absolute right-0 bottom-0'/>
             <div className='absolute inset-0 flex flex-col ml-10 pt-3 z-1'>
             <h1 className='font-semibold text-[30px] text-white'>My Goals</h1>
             <p className='text-white'>increases chance of success</p>
            </div>
          </div>
           </Link>
          <Link to='/dashboard/mystudy' className='w-[48%]'>
          <div className='bg-[#73BDC0]  h-[210px] rounded-3xl relative'>
              <img src={img10} alt="" className='absolute left-0 top-0 z-0' />
             <img src={img9} alt="" className='absolute right-0 bottom-0' />
             <div className='absolute inset-0 flex flex-col ml-10 pt-3'>
             <h1 className='font-semibold text-[30px] text-white'>My Study</h1>
             <p className='text-white'>Number of preset questions</p>
            </div>
          </div>
          </Link>
          <Link to='/dashboard/coverlatter' className='w-[48%]'>
          <div className='bg-[#FFD143]  h-[210px] rounded-3xl relative z-0'>
             <img src={img11} alt="" className='absolute right-5 bottom-0'/>
             <div className='absolute inset-0 flex flex-col ml-10 pt-3'>
             <h1 className='font-semibold text-[30px] text-white'>My CV</h1>
             <p className='text-white'>Different text formatting</p>
            </div>
          </div>
          </Link>
          <Link to='/dashboard/selfassestaint' className='w-[48%]'>
          <div className='bg-[#8EB2F4]  h-[210px] rounded-3xl relative z-0'>
             <img src={img15} alt="" className='absolute right-0 bottom-0'/>
              <img src={img16} alt="" className='absolute right-4 bottom-0'/>
              <div className='absolute inset-0 flex flex-col ml-10 pt-3'>
             <h1 className='font-semibold text-[30px] text-white'>My Self Assessment</h1>
             <p className='text-white'>Career Tutorial Video and Quizzes</p>
            </div>
          </div>
          </Link>
          <Link to='/dashboard/educationalguidance' className='w-[48%]'>
          <div className='bg-[#E088EF]  h-[210px] rounded-3xl relative'>
             <img src={img17} alt="" className='absolute right-0 bottom-0'/>
             <div className="absolute inset-0 flex flex-col ml-10 pt-3 leading-tight">
                <h1 className="font-semibold text-[30px] text-white m-0">My Educational</h1>
                <h1 className="font-semibold text-[30px] text-white m-0">Guidance</h1>
                <p className="text-white mt-1">Give your Quizzes'</p>
                </div>
          </div>
          </Link>
        </div>
        {/* Educational purpose  */}
         <div className='flex items-center justify-between mt-8'>     
          <h1 className='text-[24px] font-semibold'>My Educational Guidance</h1>
          <button
          onClick={() =>setShowAll(!showall)}
            className='flex items-center justify-center gap-2 mr-6 text-[#1476B7] hover:underline'
          >
            {showall ? "veiw all" :"view less"} <FaArrowRight />
          </button>
        </div>
           <div className='flex flex-wrap gap-4 mt-10'>
          {visibleQuizzes.map((quiz) => (
            <div key={quiz.id} className='bg-[#F7F7F7] h-25 rounded-3xl w-[48%] relative'>
              <div className='flex items-center justify-between p-5'>
                <div className='w-14 h-14 bg-[#D0E5F9] flex items-center justify-center rounded-xl'>
                  <img src={img18} alt="" className='text-[#369FFF]'/>
                </div>
                <div className='flex flex-col leading-tight'>
                  <h1 className='font-semibold'>{quiz.title}</h1>
                  <span className='text-[#BDBDBD]'>{quiz.desc}</span>
                </div>
                <button className='bg-[#1476B7] h-8 px-3 rounded-md text-white'>Take Test</button>
              </div>
            </div>
          ))}
        </div>
         {/* end */}
      </div>
      <div className="w-[30%] pr-4 rounded-lg ">
        <h2 className="text-[24px] font-semibold ml-2">Psychometric Tests</h2>
        <div className='w-[99%] p-2 space-y-10 h-[450px] mt-9'>
           <div className='border border-gray-200 rounded-md flex items-center justify-between w-full p-4'>
            <span>Occupational Interests</span>
            <button className='bg-[#1476B7] py-3 px-4 rounded-md text-white'>Take Test</button>
           </div>
           <div className='border border-gray-200 rounded-md flex items-center justify-between w-full p-4'>
            <span>Occupational Interests</span>
            <button className='bg-[#1476B7] py-3 px-4 rounded-md text-white'>Take Test</button>
           </div>
           <div className='border border-gray-200 rounded-md flex items-center justify-between w-full p-4'>
            <span>Occupational Interests</span>
            <button className='bg-[#1476B7] py-3 px-4 rounded-md text-white'>Take Test</button>
           </div>
        </div>
        
      </div>
    </div>
  )
}

export default Overview
