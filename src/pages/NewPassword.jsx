import React, { useState } from "react";
import Warrper from "../component/Warrper";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2 items-center justify-center px-5 sm:px-30 md:px-50 lg:px-20">
      {/* Left Side */}
      <div className="flex flex-col items-start w-full">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src="vector.svg" alt="logo" className="w-10 h-10 sm:w-12 sm:h-12" />
          <h1 className="text-[20px] sm:text-[24px] text-[#1476B7] font-semibold leading-7">
            My Career <br /> Guidance
          </h1>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md mt-10">
          <div className="flex flex-col gap-6">
            {/* Heading */}
            <div className="gap-1">
              <h1 className="text-black font-semibold text-2xl sm:text-3xl">
                Create New Password
              </h1>
              <p className="text-[#333333] text-sm sm:text-base leading-relaxed mt-2">
                Your new password must be different from previously used passwords.
              </p>
            </div>

            {/* New Password Field */}
            <div className="relative border border-[#D3D3D3] rounded-xl focus-within:ring-2 focus-within:ring-[#1476B7] transition-all">
              <span className="absolute pl-4 text-[#737373] mt-1 text-sm">Password</span>
              <img
                src={showPassword ? "HidePassword.svg" : "ShowPassword.svg"}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 pr-5 cursor-pointer"
                alt="toggle"
                onClick={() => setShowPassword(!showPassword)}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*************"
                className="w-full mt-4 py-4 pl-4 pr-10 placeholder:text-[#737373] outline-none rounded-xl"
              />
            </div>
            <span className="text-[#737373] text-sm">
              Must be at least 8 characters.
            </span>

            {/* Confirm Password Field */}
            <div className="relative border border-[#D3D3D3] rounded-xl focus-within:ring-2 focus-within:ring-[#1476B7] transition-all">
              <span className="absolute pl-4 text-[#737373] mt-1 text-sm">
                Confirm Password
              </span>
              <img
                src={showConfirm ? "HidePassword.svg" : "ShowPassword.svg"}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 pr-5 cursor-pointer"
                alt="toggle"
                onClick={() => setShowConfirm(!showConfirm)}
              />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="*************"
                className="w-full mt-4 py-4 pl-4 pr-10 placeholder:text-[#737373] outline-none rounded-xl"
              />
            </div>
            <span className="text-[#737373] text-sm">
              Both passwords must match.
            </span>

            {/* Update Button */}
            <button className="mt-2 border w-full p-4 sm:p-5 rounded-xl bg-[#1476B7] text-white text-lg sm:text-xl hover:bg-blue-600 transition-all">
              Update Password
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center sm:text-left w-full">
          <p className="text-[#8A8A8A] text-sm sm:text-base">
            © {new Date().getFullYear()} My Career Guidance. All Rights Reserved
          </p>
        </div>
      </div>

      {/* Right Side (Hidden on small devices) */}
      <div className="hidden lg:block">
        <Warrper />
      </div>
    </div>
  );
};

export default NewPassword;
