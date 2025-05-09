import { Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar.tsx/Navbar";
import Footer from "../Home/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
