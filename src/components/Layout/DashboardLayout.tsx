import { Link, NavLink, Outlet } from "react-router-dom";
import { sidebarItemsGenerator } from "../../Utils/sideBarGenerator";
import AdminRoutes from "../../Routes/AdminRoutes";
import UserRoutes from "../../Routes/UserRoute";
import { IoHomeOutline } from "react-icons/io5";
import { useAppSelector } from "../../Redux/hook";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { AlignJustify, X } from "lucide-react";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUserRole = useAppSelector((state) => state.auth.user?.role);
  let sidebarItem;

  switch (currentUserRole) {
    case userRole.ADMIN:
      sidebarItem = sidebarItemsGenerator(AdminRoutes, userRole.ADMIN);
      break;
    case userRole.USER:
      sidebarItem = sidebarItemsGenerator(UserRoutes, userRole.USER);
      break;
    default:
      break;
  }

  return (
    <div className="max-w-[2520px] mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden block p-2  text-black fixed top-4 left-4 z-50 rounded-md"
      >
        {isOpen ? <X/> : <AlignJustify />}
      </button>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 w-60 h-screen text-black shadow-xl border-2 bg-white z-50 transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <Link to={"/"}>
            <div className="flex pt-10 justify-center items-center mt-2">
              <img className="w-[50%] md:w-[70%]" src={logo} alt="Logo" />
            </div>
          </Link>

          <div className="flex flex-col justify-between min-h-[calc(100vh-96px)]">
            <ul className="text-lg space-y-3 pt-8 px-2 text-center">
              {sidebarItem?.map((item, index) => (
                item && (
                  <li
                    key={index}
                    className="bg-green-50 hover:bg-gray-100 text-[#4C765E] hover:text-[#4C765E] font-semibold px-4 py-2 rounded-md"
                  >
                    <NavLink to={`${item.label}`}>{item.key}</NavLink>
                  </li>
                )
              ))}
                   <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden block p-2 text-black fixed top-4 left-4 z-50 rounded-md"
            >
              {isOpen ? <X /> : <AlignJustify />}
            </button>
            </ul>

            <div>
              <ul className="list-none text-lg space-y-3 pt-8 px-2 text-center">
                <li className="bg-green-50 hover:bg-gray-100 text-[#4C765E] hover:text-[#4C765E] font-semibold px-4 py-2 rounded-md">
                  <NavLink
                    className="flex items-center justify-center"
                    to={`/`}
                  >
                    <IoHomeOutline size={20} /> &nbsp; Home
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:ml-60 ml-0 pt-8 px-4 md:px-14 bg-base-200 transition-all duration-300 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
