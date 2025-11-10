import { desc } from 'framer-motion/client'
import React, { useState } from 'react'
import img18 from '/quiz.svg'
import { FaArrowRight } from "react-icons/fa";
const SelfAssestaint = () => {
  const [showall,setShowAll] = useState(false)
  const quizzes = [
    {id:1, title:"Psychometric Test 1", desc:"Lorem ipsum is a place"},
    {id:2, title:"Psychometric Test 2", desc:"Lorem ipsum is a place"},
    {id:3, title:"Psychometric Test 3", desc:"Lorem ipsum is a place"},
    {id:4, title:"Psychometric Test 4", desc:"Lorem ipsum is a place"},
    {id:5, title:"Psychometric Test 5", desc:"Lorem ipsum is a place"},
    {id:6, title:"Psychometric Test 6", desc:"Lorem ipsum is a place"},
  ];
  const  visibleQuizzes = showall ? quizzes : quizzes.slice(0,3)
  return (
    <div className='ml-24 mt-28 bg-[#F8FAFC] p-8'>
      <div className='flex items-center justify-between'>
        <span className='text-[24px] font-semibold'>Self Assessment</span>
        <button
         className='flex items-center justify-center gap-2 mr-6 text-[#1476B7] hover:underline'
         onClick={() =>setShowAll(!showall)}
        >
        {showall ? "veiw less" : "veiw All"} <FaArrowRight/>
        </button>
      </div>
        <div className='flex flex-col gap-4 mt-10'>
            {visibleQuizzes.map((quiz) => (
              <div key={quiz.id} className='bg-white h-35 rounded-3xl relative'>
                <div className='flex items-center justify-between p-10'>
                 <div className='flex gap-24 items-center justify-center'>
                  <div className='w-14 h-14 bg-[#D0E5F9] flex items-center justify-center rounded-xl'>
                 <img src={img18} alt="" className='text-[#369FFF]'/>
                  </div>
                  <div className='flex flex-col leading-tight'>
                  <h1 className='font-semibold'>{quiz.title}</h1>
                  <span className='text-[#BDBDBD]'>{quiz.desc}</span>
                   </div>
                 </div>
                  <button className='bg-[#1476B7] h-8 px-3 rounded-md text-white'>Take Test</button>
                  </div>
                   </div>
          ))}
       </div>
    </div>
  )
}

export default SelfAssestaint