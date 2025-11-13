import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: "/dashboard/overview", label: "Overview" },
    { path: "/dashboard/cadcalculator", label: "Cad Calculator" },
    { path: "/dashboard/mygoal", label: "My Goal" },
    { path: "/dashboard/coverlatter", label: "CV / Cover Letter" },
    { path: "/dashboard/selfassestaint", label: "Self Assistance" },
    { path: "/dashboard/mystudy", label: "My Study" },
    { path: "/dashboard/educationalguidance", label: "Educational Guidance" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-[#F8FAFC] shadow-sm z-50">
      <div className="  flex items-center justify-between px-4 py-3 md:py-4 relative">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/vector.svg" alt="logo" className="w-10 h-10" />
          <h1 className="text-xl sm:text-2xl font-semibold text-[#1476B7] leading-tight">
            My Career <br className="hidden sm:block" /> Guidance
          </h1>
        </div>

        {/* Center Paragraph */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <p className="text-[#1476B7] text-sm md:text-base text-center whitespace-nowrap lg:mr-247">
            Hello, <span className="font-bold">Bruno Fernandes</span> 👋
          </p>
        </div>

        {/* Profile Card */}
        <div className="hidden md:flex items-center gap-4">
          <div className="bg-[#1476B7] flex items-center gap-3 p-2 px-3 rounded-lg text-white">
            <img
              src="/profile.jpg"
              alt=""
              className="w-10 h-10 rounded-md object-cover border border-white/30"
            />
            <div className="leading-tight">
              <h3 className="font-semibold text-sm">Bruno Fernandes</h3>
              <p className="text-xs opacity-90 truncate">bruno@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#1476B7] focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md animate-slide-down">
          <div className="flex flex-col p-4 space-y-3 text-gray-700">
            {navItems.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `py-2 px-3 rounded-md transition-colors hover:bg-blue-50 hover:text-[#1476B7] ${
                    isActive ? "bg-blue-100 text-[#1476B7] font-semibold" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button className="flex items-center justify-center gap-2 bg-[#1476B7] text-white py-2 rounded-md hover:bg-[#0f5e96] transition-all">
              <LogOut size={16} />
              Logout
            </button>

            {/* Mobile Profile Card */}
            <div className="flex items-center gap-3 border-t border-gray-200 pt-4 mt-2">
              <img
                src="/profile.jpg"
                alt=""
                className="w-10 h-10 rounded-md object-cover border border-gray-300"
              />
              <div className="leading-tight text-sm">
                <h3 className="font-semibold">Bruno Fernandes</h3>
                <p className="text-gray-500 text-xs">bruno@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
