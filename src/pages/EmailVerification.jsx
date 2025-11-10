import React from "react";
import Warrper from "../component/Warrper";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();

  const handleRequest = () => {
    navigate("/newPassword");
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2 items-center justify-center px-5 sm:px-10 lg:px-20">
      {/* Left Section */}
      <div className="flex flex-col items-start w-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="vector.svg" alt="logo" className="w-10 h-10 sm:w-12 sm:h-12" />
          <h1 className="text-[20px] sm:text-[23.69px] text-[#1476B7] font-semibold leading-7">
            My Career <br /> Guidance
          </h1>
        </div>

        {/* Main Box */}
        <div className="w-full max-w-md mt-10 sm:mt-14">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-black font-semibold text-2xl sm:text-3xl">
                Email Verification
              </h1>
              <p className="mt-2 text-[#333333] text-sm sm:text-base leading-relaxed">
                Please enter the 4-digit verification code that was sent to your email. <br />
                Make sure you enter the exact code sent to you.
              </p>
            </div>

            {/* OTP + Button inside same width container */}
            <div className="flex flex-col gap-6 w-full">
              {/* OTP Boxes */}
              <div className="flex justify-between mt-2 sm:justify-between">
                <input
                  type="text"
                  maxLength="1"
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DADADA8F] rounded-[9px] text-center text-xl font-semibold outline-none border border-transparent focus:border-[#1476B7] transition-all"
                />
                <input
                  type="text"
                  maxLength="1"
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DADADA8F] rounded-[9px] text-center text-xl font-semibold outline-none border border-transparent focus:border-[#1476B7] transition-all"
                />
                <input
                  type="text"
                  maxLength="1"
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DADADA8F] rounded-[9px] text-center text-xl font-semibold outline-none border border-transparent focus:border-[#1476B7] transition-all"
                />
                <input
                  type="text"
                  maxLength="1"
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DADADA8F] rounded-[9px] text-center text-xl font-semibold outline-none border border-transparent focus:border-[#1476B7] transition-all"
                />
              </div>

              {/* Button */}
              <button
                onClick={handleRequest}
                className="border w-full p-4 sm:p-5 rounded-xl bg-[#1476B7] text-white text-lg sm:text-[20px] hover:bg-blue-600 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center sm:text-left w-full">
          <p className="text-[#8A8A8A] text-sm sm:text-base">
            © {new Date().getFullYear()} My Career Guidance. All Rights Reserved
          </p>
        </div>
      </div>

      {/* Right Side (Hide on small screens) */}
      <div className="hidden lg:block">
        <Warrper />
      </div>
    </div>
  );
};

export default EmailVerification;
