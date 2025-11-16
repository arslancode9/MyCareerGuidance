import React, { useState } from 'react'
import img18 from '/quiz.svg'
import { FaArrowRight } from "react-icons/fa";

const SelfAssessment = () => {
  const [showAll, setShowAll] = useState(false);

  const quizzes = [
    { id: 1, title: "Psychometric Test 1", desc: "Lorem ipsum is a place" },
    { id: 2, title: "Psychometric Test 2", desc: "Lorem ipsum is a place" },
    { id: 3, title: "Psychometric Test 3", desc: "Lorem ipsum is a place" },
    { id: 4, title: "Psychometric Test 4", desc: "Lorem ipsum is a place" },
    { id: 5, title: "Psychometric Test 5", desc: "Lorem ipsum is a place" },
    { id: 6, title: "Psychometric Test 6", desc: "Lorem ipsum is a place" },
  ];

  const visibleQuizzes = showAll ? quizzes : quizzes.slice(0, 3);

  return (
    <div className=" min-h-screen bg-[#F8FAFC] p-4 sm:p-6 md:p-10 md:ml-20 md:mt-23 lg:ml-24 lg:mt-28 sm:mt-89">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="text-[22px] sm:text-[24px] font-semibold text-gray-800">
          Self Assessment
        </span>
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 text-[#1476B7] font-medium hover:underline transition"
        >
          {showAll ? "View Less" : "View All"} <FaArrowRight />
        </button>
      </div>

      {/* Quizzes */}
      <div className="grid grid-cols-1 md:flex md:flex-col sm:flex-col lg:grid-cols-3 gap-5 mt-8">
        {visibleQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="w-14 h-14 bg-[#D0E5F9] flex items-center justify-center rounded-xl">
                <img src={img18} alt="quiz icon" className="w-8 h-8" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-800 text-lg">{quiz.title}</h2>
                <p className="text-gray-400 text-sm">{quiz.desc}</p>
              </div>
              <button className="mt-6 bg-[#1476B7] text-white text-sm sm:text-base py-2 px-4 rounded-lg self-start hover:bg-[#0f5c91] transition">
              Take Test
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfAssessment;
