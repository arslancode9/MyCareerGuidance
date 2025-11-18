import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CadCalculator, DashBoard, EducationalGuidance, EmailVerification, ForgetPassword, Login, MyGoal, MyStudy, NewPassword, SelfAssestaint, Signup, Profile } from "./pages";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Overview from "./pages/Overview";
import Layout from './Layout/Layout'
import CoverLatter from "./pages/CoverLatter";
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" newestOnTop={false} />

      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/emailVerification" element={<EmailVerification />} />
        <Route path="/newPassword" element={<NewPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="cadcalculator" element={<CadCalculator/>}/>
          <Route path="mygoal" element={<MyGoal/>}/>
          <Route path= "coverlatter" element={<CoverLatter/>}/>
          <Route path="selfassestaint" element={<SelfAssestaint/>}/>
          <Route path="mystudy" element={<MyStudy/>}/>
          <Route path="educationalguidance" element={<EducationalGuidance/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
