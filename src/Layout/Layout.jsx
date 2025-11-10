import React from "react";
import { Header, AsideNavbar} from "../component";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <AsideNavbar />
        <main className="flex-1 p-6 ml-40  bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
