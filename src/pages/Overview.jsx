import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import img8 from "/Search.svg";
import img9 from "/Studaydiv.svg";
import img10 from "/div.svg";
import img11 from "/Coverlatter1.svg";
import img12 from "/MyGoal1.svg";
import img13 from "/MyGoal2.svg";
import img14 from "/cdo.svg";
import img15 from "/self.svg";
import img16 from "/self1.svg";
import img17 from "/education1.svg";
import img18 from "/quiz.svg";

const Overview = () => {
  const [showall, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const quizzes = [
    { id: 1, title: "Quiz 01", desc: "Lorem ipsum is a place" },
    { id: 2, title: "Quiz 02", desc: "Lorem ipsum is a place" },
    { id: 3, title: "Quiz 03", desc: "Lorem ipsum is a place" },
    { id: 4, title: "Quiz 04", desc: "Lorem ipsum is a place" },
    { id: 5, title: "Quiz 05", desc: "Lorem ipsum is a place" },
    { id: 6, title: "Quiz 06", desc: "Lorem ipsum is a place" },
  ];

  const cards = [
    {
      title: "CAO Point Calculator",
      desc: "Final score is displayed",
      img1: img14,
      bg: "#8AC53E",
      link: "/dashboard/cadcalculator",
    },
    {
      title: "My Goals",
      desc: "Increases chance of success",
      img1: img13,
      img2: img12,
      bg: "#ADBEC4",
      link: "/dashboard/mygoal",
    },
    {
      title: "My Study",
      desc: "Number of preset questions",
      img1: img10,
      img2: img9,
      bg: "#73BDC0",
      link: "/dashboard/mystudy",
    },
    {
      title: "My CV",
      desc: "Different text formatting",
      img2: img11,
      bg: "#FFD143",
      link: "/dashboard/coverlatter",
    },
    {
      title: "My Self Assessment",
      desc: "Career Tutorial Video and Quizzes",
      img1: img15,
      img2: img16,
      bg: "#8EB2F4",
      link: "/dashboard/selfassestaint",
    },
    {
      title: "My Educational Guidance",
      desc: "Give your Quizzes",
      img2: img17,
      bg: "#E088EF",
      link: "/dashboard/educationalguidance",
    },
  ];

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleQuizzes = showall ? quizzes : quizzes.slice(0, 2);

  return (
    <div className="z-0 mt-30 md:ml-20 flex flex-col lg:flex-row p-3 md:p-5 sm:pt-13">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-[70%] flex flex-col pr-0 lg:pr-4">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-[22px] md:text-[24px] font-semibold">Career Guidance</h1>

          <div className="relative w-full sm:w-auto">
            <img
              src={img8}
              alt="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-2 focus:outline-none rounded-md w-full sm:w-48 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* 6 Boxes Section */}
        <div className="w-full flex flex-wrap gap-5 mt-8">
          {filteredCards.map((card, index) => (
            <Link key={index} to={card.link} className="w-full sm:w-[48%]">
              <div
                className="h-[200px] rounded-3xl relative overflow-hidden"
                style={{ backgroundColor: card.bg }}
              >
                {card.img1 && (
                  <img src={card.img1} alt="" className="absolute left-0 top-0" />
                )}
                {card.img2 && (
                  <img src={card.img2} alt="" className="absolute right-0 bottom-0" />
                )}
                <div className="absolute inset-0 flex flex-col ml-6 pt-4">
                  <h1 className="font-semibold text-[24px] text-white">{card.title}</h1>
                  <p className="text-white">{card.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Educational Guidance Quizzes */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
          <h1 className="text-[22px] font-semibold">My Educational Guidance</h1>
          <button
            onClick={() => setShowAll(!showall)}
            className="flex items-center justify-center gap-2 text-[#1476B7] hover:underline"
          >
            {showall ? "View less" : "View all"} <FaArrowRight />
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          {visibleQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-[#F7F7F7] rounded-3xl w-full sm:w-[48%]">
              <div className="flex items-center justify-between p-5">
                <div className="w-14 h-14 bg-[#D0E5F9] flex items-center justify-center rounded-xl">
                  <img src={img18} alt="" />
                </div>
                <div className="flex flex-col leading-tight flex-1 ml-4">
                  <h1 className="font-semibold">{quiz.title}</h1>
                  <span className="text-[#BDBDBD]">{quiz.desc}</span>
                </div>
                <button className="bg-[#1476B7] h-8 px-3 rounded-md text-white">Take Test</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[30%] mt-10 lg:mt-0 pr-0 lg:pr-4 rounded-lg">
        <h2 className="text-[22px] md:text-[24px] font-semibold mb-4">Psychometric Tests</h2>
        <div className="w-full p-2 space-y-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-gray-200 rounded-md flex items-center justify-between w-full p-4">
              <span>Occupational Interests</span>
              <button className="bg-[#1476B7] py-2 px-4 rounded-md text-white">Take Test</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
