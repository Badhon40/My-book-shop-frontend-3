import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative w-full  "
      style={{
        height: "calc(100vh - 80px)", // 96px = h-24 navbar height
        backgroundImage:
          "url(https://i.ibb.co.com/S7W8hm7Q/new-release-360632003.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* SALE / DISCOUNT Badges */}
      <div className="absolute top-6 left-6 lg:top-10 lg:left-36 z-10">
        <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
          SALE 50% OFF
        </span>
      </div>
      <div className="absolute top-6 right-6 lg:top-10 lg:right-36 z-10">
        <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
          DISCOUNT ON BESTSELLERS
        </span>
      </div>

      {/* Main Banner Content */}
      <div className="relative z-10 max-w-[90%] mx-auto h-full flex items-center justify-center text-center">
        <div className="text-white p-6 lg:p-20 bg-black bg-opacity-30 rounded-lg backdrop-blur-sm">
          <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-xl tracking-wide uppercase">
            Welcome to BookStore
          </h1>
          <p className="mb-8 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Explore handpicked collections and enjoy exclusive offers on your favorite books.
          </p>
          <NavLink to={"/allbooks"}>
            <button className="btn btn-outline border-white text-white hover:text-white hover:bg-orange-500  transition-all duration-300 px-6 py-2 text-lg">
              Browse Collection
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Banner;
