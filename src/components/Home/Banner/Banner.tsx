import { NavLink } from "react-router-dom";
import banner from "../../../assets/banner.jpg"; // Adjust the path to your image

const BannerWithImage = () => {
  return (
    <div className="relative w-full h-[80vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Left Content */}
      <div className="relative flex items-center justify-center bg-[#84cea4] text-white p-10 lg:p-20">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

        <div className="relative z-10 text-center lg:text-left max-w-lg">
          <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg tracking-wide uppercase">
            Welcome to BookStore
          </h1>
          <p className="mb-8 text-lg md:text-xl text-white/90">
            Explore handpicked collections and enjoy exclusive offers on your favorite books.
          </p>
          <NavLink to={"/allbooks"}>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#4C765E] transition-all duration-300 px-6 py-2 text-lg">
              Browse Collection
            </button>
          </NavLink>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative">
        <img
          src={banner}
          alt="Book Collection"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default BannerWithImage;