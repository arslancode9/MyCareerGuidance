import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registeredUsers: [],
  currentUser: null,
  isAuthenticated: false,
  emailToVerify: null,
  verificationCode: null,
  isVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      state.registeredUsers.push(action.payload);
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
      } else {
        state.currentUser = null;
        state.isAuthenticated = false;
      }
    },

    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },

    startForgetPassword: (state, action) => {
      state.emailToVerify = action.payload.email;
      state.verificationCode = action.payload.code;
      state.isVerified = false;
    },

    verifyCode: (state, action) => {
      if (
        state.verificationCode &&
        action.payload.code === state.verificationCode
      ) {
        state.isVerified = true;
      } else {
        state.isVerified = false;
      }
    },

    updatePassword: (state, action) => {
      const { email, newPassword } = action.payload;
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find((u) => u.email === email);
      if (user) {
        user.password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));

        state.emailToVerify = null;
        state.verificationCode = null;
        state.isVerified = false;
      }
    },
  },
});

export const {
  signup,
  login,
  logout,
  startForgetPassword,
  verifyCode,
  updatePassword,
} = authSlice.actions;
export default authSlice.reducer;
