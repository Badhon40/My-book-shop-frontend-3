import { NavLink } from "react-router-dom";

const BannerSection = () => {
  return (
    <div className="w-full ">
      {/* Left Content */}
      <div className="text-center bg-[#4C765E] text-white p-6 lg:p-20 h-[70vh] flex flex-col justify-center items-center">
        <div className="space-y-6 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold max-w-3xl mx-auto">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-base sm:text-lg md:text-xl">
            Explore handpicked collections and enjoy exclusive offers on your favorite books.
          </p>
          <NavLink to="/allbooks">
            <button className="bg-white text-[#4C765E] mt-4 px-5 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-lg hover:bg-[#3b5f4e] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg">
              Browse Collection
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
