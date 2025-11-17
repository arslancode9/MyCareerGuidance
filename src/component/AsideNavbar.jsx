import React from "react";
import { NavLink ,Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import img1 from "/Overveiw.svg";
import img2 from "/cadcalculat.svg";
import img3 from "/MyGoal.svg";
import img4 from "/CoverLatter.svg";
import img5 from "/SelfAssistance.svg";
import img6 from "/MyStudy.svg";
import img7 from "/Education.svg";

const AsideNavbar = () => {
  const navItems = [
    { path: "/dashboard/overview", label: "Overview", img: img1 },
    { path: "/dashboard/cadcalculator", label: "Cad Calculator", img: img2 },
    { path: "/dashboard/mygoal", label: "My Goal", img: img3 },
    { path: "/dashboard/coverlatter", label: "CV / Cover Letter", img: img4 },
    { path: "/dashboard/selfassestaint", label: "Self Assistance", img: img5 },
    { path: "/dashboard/mystudy", label: "My Study", img: img6 },
    { path: "/dashboard/educationalguidance", label: "Educational Guidance", img: img7 },
  ];

  return (
    <aside className="w-[245px] left-0 top-24 fixed h-[90vh] bg-[#F8FAFC] shadow-md p-4 hidden md:block">
      <nav className="flex flex-col gap-5 mt-3">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive ? "text-[#1476B7]" : "text-[#737373]"
                }`}
              >
                <img
                  src={item.img}
                  className="w-5 h-5"
                  alt={item.label}
                />
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-2 h-2 bg-[#1476B7] rounded-full ml-5"></span>
                )}
              </div>
            )}
          </NavLink>
        ))}
        <img src="Aside.svg" alt="" className="mt-3 w-36 h-36"/>
        <Link to='/signup' className="flex items-center justify-center gap-2 bg-[#1476B7] text-white py-2 rounded-md hover:bg-[#0f5e96] transition-all mt-3 cursor-pointer">
              <LogOut size={16} />
              Logout
        </Link>
      </nav>
    </aside>
  );
};

export default AsideNavbar;
