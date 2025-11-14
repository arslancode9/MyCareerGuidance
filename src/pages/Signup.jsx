import React, { useRef, useState } from "react";
import Warrper from "../component/Warrper";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [showModel, setShowModel] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef();
  const [ShowPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    password: "",
    school: "",
    country: "",
    month: "",
    day: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.FullName || !formData.email || !formData.password) {
      toast.error("Please fill in Name, Email, and Password!");
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = existingUsers.some(
      (user) => user.email === formData.email
    );

    if (userExists) {
      toast.error("Email already registered. Please login!");
      return;
    }

    const newUser = {
      ...formData,
      profilePicture: fileName || null,
    };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    toast.success("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2 items-center justify-center px-5 sm:px-10 md:px-30  lg:px-20">
      {/* Left Section */}
      <div className="flex flex-col items-start w-full">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center gap-3">
            <img src="vector.svg" alt="logo" className="w-10 h-10 sm:w-12 sm:h-12" />
            <h1 className="text-[20px] sm:text-[23.69px] text-[#1476B7] font-semibold leading-7">
              My Career <br /> Guidance
            </h1>
          </div>
          {/* Mobile Login/Signup */}
          <div className="flex items-center gap-1 px-4 py-2 lg:hidden text-white border border-[#1476B7] bg-[#1476B7] rounded-lg text-sm sm:text-base sm:mr-12">
            <Link to="/login">Login</Link>/<Link to="/signup">Signup</Link>
          </div>
        </div>

        {/* Signup Form */}
        <div className="w-full max-w-md sm:max-w-lg bg-white">
          <form className="flex flex-col gap-4 mt-4 sm:mt-8" onSubmit={handleSubmit}>
            <div>
              <h1 className="text-[#333333] text-[24px] sm:text-[26px] font-bold">Hello!</h1>
              <p className="text-[#737373]">Signup to Get Started</p>
            </div>

            {/* Full Name */}
            <div className="relative">
              <img
                src="Group.svg"
                alt=""
                className="absolute border-r-2 border-[#D3D3D3] pl-3 pr-4 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                name="FullName"
                placeholder="Full Name"
                value={formData.FullName}
                onChange={handleChange}
                className="border border-[#D3D3D3] pl-15 placeholder:text-[#9D9C9D] w-full py-4 rounded-xl outline-none focus:outline-none focus:border-[#1476B7] focus:ring-2 focus:ring-[#1476B7]"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <img
                src="path.svg"
                alt=""
                className="absolute border-r-2 border-[#D3D3D3] pl-3 pr-2 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border border-[#D3D3D3] pl-15 placeholder:text-[#9D9C9D] w-full py-4 rounded-xl outline-none focus:border-[#1476B7] focus:ring-2 focus:ring-[#1476B7]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <img
                src={ShowPassword ? "HidePassword.svg" : "ShowPassword.svg"}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 pr-5 cursor-pointer"
                onClick={() => setShowPassword(!ShowPassword)}
              />
              <img
                src="password.svg"
                alt=""
                className="absolute border-r-2 border-[#D3D3D3] pl-3 pr-4 top-1/2 transform -translate-y-1/2"
              />
              <input
                name="password"
                type={ShowPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border border-[#D3D3D3] pl-15 w-full py-4 placeholder:text-[#9D9C9D] rounded-xl outline-none focus:outline-none focus:border-[#1476B7] focus:ring-2 focus:ring-[#1476B7]"
              />
            </div>

            {/* School Input */}
            <div className="relative">
              <img
                src="school.svg"
                alt=""
                className="absolute border-r-2 border-[#D3D3D3] pl-3 pr-2 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                name="school"
                placeholder="School"
                value={formData.school}
                onChange={handleChange}
                className="border border-[#D3D3D3] pl-15 placeholder:text-[#9D9C9D] w-full py-4 rounded-xl outline-none focus:outline-none focus:border-[#1476B7] focus:ring-2 focus:ring-[#1476B7]"
              />
              <img
                src="22.svg"
                alt="open"
                className="absolute right-2 pr-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowModel(true)}
              />
            </div>

            {/* Modal */}
            {showModel && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
                <div className="relative flex flex-col items-center justify-center bg-white rounded-xl shadow-lg w-[90%] max-w-[500px] p-6 sm:p-8">
                  <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
                    onClick={() => setShowModel(false)}
                  >
                    ✕
                  </button>
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
                    Model 1000px Width
                  </h2>

                  <div className="flex flex-col gap-3 w-full">
                    <div className="relative">
                      <img
                        src="school.svg"
                        alt=""
                        className="absolute border-r-2 border-[#D3D3D3] pl-3 pr-2 top-1/2 transform -translate-y-1/2"
                      />
                      <input
                        type="text"
                        placeholder="School"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        className="border border-[#D3D3D3] py-4 pl-15 placeholder:text-[#9D9C9D] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                      />
                    </div>
                    <div className="relative">
                      <img
                        src="Country.svg"
                        alt=""
                        className="absolute border-r-2 border-[#D3D3D3] pl-3 pr-2 top-1/2 transform -translate-y-1/2"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="p-4 pl-15 border border-[#D3D3D3] placeholder:text-[#9D9C9D] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 sm:gap-5 mt-5">
                    <button
                      className="px-6 sm:px-8 py-2 rounded-xl bg-[#1476B7] text-white hover:bg-blue-600"
                      onClick={() => setShowModel(false)}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setShowModel(false)}
                      className="px-6 sm:px-8 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Date of Birth Section */}
            <div className="flex flex-wrap gap-3 sm:gap-5 text-[#9D9C9D]">
              {["Month", "Day", "Year"].map((label, i) => (
                <div
                  key={label}
                  className={`relative ${
                    i === 0
                      ? "w-[45%] sm:w-[150px]"
                      : i === 1
                      ? "w-[33%]"
                      : "w-[45%] sm:w-[150px]"
                  }`}
                >
                  <select
                    name={label.toLowerCase()}
                    value={formData[label.toLowerCase()]}
                    onChange={handleChange}
                    defaultValue=""
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="" disabled hidden>
                      {label}
                    </option>
                    {label === "Month" &&
                      ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    {label === "Day" &&
                      Array.from({ length: 31 }, (_, d) => d + 1).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    {label === "Year" &&
                      Array.from({ length: 100 }, (_, y) => {
                        const year = new Date().getFullYear() - y;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                  </select>
                  <img
                    src="22.svg"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                  />
                </div>
              ))}
            </div>

            {/* File Upload */}
            <div className="relative text-[#9D9C9D]">
              <img
                src="school.svg"
                alt=""
                className="absolute border-r-2 border-[#D3D3D3] pl-3 pr-2 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFileName(file ? file.name : "");
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="flex items-center justify-start border pl-15 border-[#D3D3D3] w-full py-4 rounded-xl outline-none focus:outline-none focus:border-[#1476B7] focus:ring-2 focus:ring-[#1476B7]"
              >
                {fileName || "Add Profile Picture"}
              </button>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="border w-full p-4 sm:p-5 rounded-xl bg-[#1476B7] text-white hover:bg-blue-600"
            >
              SIGNUP
            </button>

            {/* Login Link */}
            <p className="text-center text-[#747688] text-sm sm:text-base">
              Already have an account?{" "}
              <Link to="/login" className="text-[#5669FF]">
                Login
              </Link>
            </p>
          </form>
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

export default Signup;
