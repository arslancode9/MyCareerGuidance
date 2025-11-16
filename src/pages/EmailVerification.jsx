import React, { useState } from "react";
import Warrper from "../component/Warrper";
import { useDispatch, useSelector } from "react-redux";
import { verifyCode } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.emailToVerify);

  const [codeInputs, setCodeInputs] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // only numbers
    const newInputs = [...codeInputs];
    newInputs[index] = value;
    setCodeInputs(newInputs);
  };

  const handleVerify = () => {
    const code = codeInputs.join("");
    dispatch(verifyCode(code));

    const isVerified = store.getState().auth.isVerified;
    if (isVerified) {
      navigate("/newPassword");
    } else {
      alert("Incorrect code");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2 items-center justify-center px-5 sm:px-30 md:px-30 lg:px-20">
      <div className="flex flex-col items-start w-full">
        <div className="flex items-center gap-3">
          <img src="vector.svg" alt="logo" className="w-10 h-10 sm:w-12 sm:h-12" />
          <h1 className="text-[20px] sm:text-[23.69px] text-[#1476B7] font-semibold leading-7">
            My Career <br /> Guidance
          </h1>
        </div>

        <div className="w-full max-w-md mt-10 sm:mt-14">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-black font-semibold text-2xl sm:text-3xl">
                Email Verification
              </h1>
              <p className="mt-2 text-[#333333] text-sm sm:text-base leading-relaxed">
                Enter the 4-digit verification code sent to <strong>{email}</strong>.
              </p>
            </div>

            <div className="flex flex-col gap-6 w-full">
              <div className="flex justify-between mt-2 sm:justify-between">
                {codeInputs.map((value, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={e => handleChange(idx, e.target.value)}
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DADADA8F] rounded-[9px] text-center text-xl font-semibold outline-none border border-transparent focus:border-[#1476B7] transition-all"
                  />
                ))}
              </div>

              <button
                onClick={handleVerify}
                className="border w-full p-4 sm:p-5 rounded-xl bg-[#1476B7] text-white text-lg sm:text-[20px] hover:bg-blue-600 transition-all"
              >
                Continue
              </button>
            </div>
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

export default EmailVerification;
