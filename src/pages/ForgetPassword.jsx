import React, { useState } from "react";
import Warrper from "../component/Warrper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startForgetPassword } from "../redux/authSlice";
import { generateVerificationCode } from "../redux/helpers";

// Email notification function
const sendEmailNotification = (email, code) => {
  // In a real application, this would call an email service API
  // For now, we'll simulate sending an email notification
  console.log(`📧 Email Notification Sent:`);
  console.log(`To: ${email}`);
  console.log(`Subject: Password Reset Verification Code`);
  console.log(`Message: Your password reset verification code is: ${code}`);
  console.log(`This code will expire in 10 minutes.`);
  
  // Show user-friendly notification
  alert(`✅ Email notification sent to ${email}\n\nYour 4-digit verification code: ${code}\n\n(Note: In production, this code would be sent via email)`);
};

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleRequest = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Check if user exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find(u => u.email === email);
    
    if (!userExists) {
      alert("No account found with this email address");
      return;
    }

    const code = generateVerificationCode();
    dispatch(startForgetPassword({ email, code }));

    // Send email notification
    sendEmailNotification(email, code);
    navigate("/emailVerification");
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2 items-center justify-center px-5 sm:px-10 md:px-50 lg:px-20">
      {/* Left Side */}
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center gap-3">
          <img src="vector.svg" alt="logo" className="w-10 h-10 sm:w-12 sm:h-12" />
          <h1 className="text-[20px] sm:text-[24px] text-[#1476B7] font-semibold leading-7">
            My Career <br /> Guidance
          </h1>
        </div>

        <div className="w-full max-w-md mt-10">
          <div className="flex flex-col gap-6">
            <div className="gap-2">
              <h1 className="text-black font-semibold text-2xl sm:text-3xl">
                Forgot your password?
              </h1>
              <p className="text-[#333333] text-sm sm:text-base leading-relaxed mt-2">
                Enter your email and we’ll send a 4-digit code to reset your password.
              </p>
            </div>

            <div className="relative mt-2">
              <img src="path.svg" alt="" className="absolute left-4 top-1/2 -translate-y-1/2 border-r border-[#D3D3D3] pr-2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full placeholder:text-[#9D9C9D] py-4 pl-18 rounded-xl border border-[#D3D3D3] outline-none focus:ring-2 focus:ring-[#1476B7] transition-all"
              />
            </div>

            <button
              onClick={handleRequest}
              className="border w-full p-4 sm:p-5 rounded-xl bg-[#1476B7] text-white text-lg sm:text-xl hover:bg-blue-600 transition-all"
            >
              Send Request
            </button>
          </div>
        </div>

        <div className="mt-6 text-center sm:text-left w-full">
          <p className="text-[#8A8A8A] text-sm sm:text-base">
            © {new Date().getFullYear()} My Career Guidance. All Rights Reserved
          </p>
        </div>
      </div>

      <div className="hidden lg:block">
        <Warrper />
      </div>
    </div>
  );
};

export default ForgetPassword;
