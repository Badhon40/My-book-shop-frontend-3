import { Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar.tsx/Navbar";
import Footer from "../Home/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9]">
      <Navbar />
      <div className="min-h-screen ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
