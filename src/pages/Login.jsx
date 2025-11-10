import React, { useState } from "react";
import Warrper from "../component/Warrper";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// 🟢 Added Redux imports
import { useDispatch } from "react-redux"; 
import { login } from "../redux/authSlice"; // 🟢 Adjust path if needed

const Login = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🟢 Added dispatch hook
  const dispatch = useDispatch(); 

  // 🟢 Updated handleLogin logic
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // 🟢 Dispatch Redux login action
      dispatch(login({ email, password }));

      // 🟢 Store in localStorage (optional)
      localStorage.setItem("currentUser", JSON.stringify(foundUser));

      toast.success("Login successful! ");
      navigate("/dashboard"); // 🟢 navigate after Redux updates
    } else {
      toast.error("Invalid email or password ");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2 items-center justify-center px-4 sm:px-10 lg:px-20 xl:px-32 bg-white">
      {/* Left Section */}
      <div className="flex flex-col items-start w-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="vector.svg" alt="logo" className="w-10 h-10 sm:w-12 sm:h-12" />
          <h1 className="text-[20px] sm:text-[24px] text-[#1476B7] font-semibold leading-7">
            My Career <br /> Guidance
          </h1>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md mt-10 flex flex-col gap-6"
        >
          {/* Heading */}
          <div className="flex flex-col gap-1">
            <h1 className="text-[#333333] text-2xl sm:text-[26px] font-bold">
              Welcome Back!
            </h1>
            <p className="text-[16px] sm:text-[18px] font-normal text-[#737373]">
              Enter your email and password
            </p>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <img
              src="path.svg"
              alt="email icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 border-r-2 border-[#D3D3D3] pr-2"
            />
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-14 py-4  rounded-xl border border-[#D3D3D3] placeholder:text-[#7A7A7A] outline-none focus:ring-2 focus:ring-[#1476B7] transition-all duration-200"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <img
              src="password.svg"
              alt="password icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 border-r-2 border-[#D3D3D3] pr-4"
            />
            <img
              src={ShowPassword ? "HidePassword.svg" : "ShowPassword.svg"}
              alt="toggle password visibility"
              onClick={() => setShowPassword(!ShowPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer w-6 h-6 opacity-80 hover:opacity-100 transition-all"
            />
            <input
              id="password"
              type={ShowPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-14 py-4 rounded-xl border border-[#D3D3D3] placeholder:text-[#7A7A7A] outline-none focus:ring-2 focus:ring-[#1476B7] transition-all duration-200"
            />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 accent-[#1476B7]" />
              <p className="text-[#737373] text-sm sm:text-base">Remember Me</p>
            </label>
            <Link
              to="/forgetPassword"
              className="text-[#737373] text-sm sm:text-base hover:text-[#1476B7] transition-all"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="border w-full p-4 sm:p-5 rounded-xl bg-[#1476B7] text-white text-lg sm:text-[20px] hover:bg-blue-600 transition-all duration-200"
          >
            SIGN IN
          </button>

          {/* Sign Up Link */}
          <p className="text-[#747688] text-center text-sm sm:text-base">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#5669FF] hover:underline">
              Sign up
            </Link>
          </p>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center sm:text-left w-full">
          <p className="text-[#8A8A8A] text-sm sm:text-base">
            © {new Date().getFullYear()} My Career Guidance. All Rights Reserved
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block">
        <Warrper />
      </div>
    </div>
  );
};

export default Login;
