import { Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar.tsx/Navbar";
import Footer from "../Home/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-grow ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
