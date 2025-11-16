// Updated Login.jsx with Remember Me block logic
import React, { useState } from "react";
import Warrper from "../component/Warrper";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  const [ShowPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!remember) {
      toast.error("Please check Remember Me to continue!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      dispatch(login({ email, password }));
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2 items-center justify-center px-4 sm:px-30 md:px-50 lg:px-20 xl:px-32 bg-white">
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center gap-3">
          <img src="vector.svg" alt="logo" className="w-10 h-10 sm:w-12 sm:h-12" />
          <h1 className="text-[20px] sm:text-[24px] text-[#1476B7] font-semibold leading-7">
            My Career <br /> Guidance
          </h1>
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-md mt-10 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[#333333] text-2xl sm:text-[26px] font-bold">
              Welcome Back!
            </h1>
            <p className="text-[16px] sm:text-[18px] font-normal text-[#737373]">
              Enter your email and password
            </p>
          </div>

          <div className="relative">
            <img src="path.svg" className="absolute left-4 top-1/2 -translate-y-1/2 border-r-2 border-[#D3D3D3] pr-2" />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-14 py-4 rounded-xl border border-[#D3D3D3] placeholder:text-[#7A7A7A] focus:ring-2 focus:ring-[#1476B7]"
            />
          </div>

          <div className="relative">
            <img src="password.svg" className="absolute left-4 top-1/2 -translate-y-1/2 border-r-2 border-[#D3D3D3] pr-4" />
            <img
              src={ShowPassword ? "HidePassword.svg" : "ShowPassword.svg"}
              onClick={() => setShowPassword(!ShowPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer w-6 h-6"
            />
            <input
              type={ShowPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-14 py-4 rounded-xl border border-[#D3D3D3] placeholder:text-[#7A7A7A] focus:ring-2 focus:ring-[#1476B7]"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-5 h-5 accent-[#1476B7]"
              />
              <p className="text-[#737373] text-sm sm:text-base">Remember Me</p>
            </label>

            <Link to="/forgetPassword" className="text-[#737373] hover:text-[#1476B7]">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="border w-full p-4 sm:p-5 rounded-xl bg-[#1476B7] text-white text-lg">
            SIGN IN
          </button>

          <p className="text-[#747688] text-center text-sm sm:text-base">
            Don’t have an account? <Link to="/signup" className="text-[#5669FF]">Sign up</Link>
          </p>
        </form>

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

export default Login;