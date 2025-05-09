
import { LogOut } from "lucide-react";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const pageLinks = [
    { name: "Home", link: "/" },
    { name: "All Books", link: "/allbooks" },
    { name: "About", link: "/about" },
  ];

  const user = { email: "user@example.com", role: "admin" };

  return (
    <div className="max-w-[80%] mx-auto">
      <div className="navbar h-24 bg-base-100 shadow-sm">
        <div className="navbar-start">
          <Link to="/">
            <img
              src={logo}
              height={100}
              width={100}
              alt="Logo"
              className="text-lg"
            />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <div className="flex items-center gap-6">
            {pageLinks.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="text-sm font-semibold hover:text-[#01DFBF] transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="navbar-end">
          {user?.email ? (
            <div className="dropdown">
              <Avatar className="bg-[#01DFBF] " icon={<UserOutlined />} />
              <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-24 lg:w-44 p-2 shadow-sm">
                <Link
                  className="mt-2 bg-brandTextTertiary hover:bg-brandTextTertiary/70 text-base"
                  to={`/${user?.role}/dashboard`}
                >
                  Dashboard
                </Link>
                <br />
                <div
                  className="flex items-center gap-2 cursor-pointer mt-2"
                  onClick={() => {
                    console.log("Logout Successful...");
                  }}
                >
                  <LogOut />
                  <span>Log out</span>
                </div>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <Button className="btn p-4 hover:bg-[#01DFBF]/50 hover:text-[#01DFBF] text-base">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
