// utils/helpers.js
export const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000); // 4-digit code
};
