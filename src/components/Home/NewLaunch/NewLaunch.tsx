/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router-dom";
import { useGetAllbooksQuery } from "../../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import Loader from "../../loader/Loader";
import errorbook from "../../../assets/4735.jpg";

const NewLaunchBook = () => {

  const { data, isLoading } = useGetAllbooksQuery(undefined);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex items-center justify-center my-8 px-4 sm:px-8">
      {
        data?.data.slice(0, 1).map((book: any) => (
          <div className="max-w-7xl w-full mx-auto p-8 rounded-2xl flex flex-col lg:flex-row gap-8 h-auto relative">
            {/* Left Side - Book Image */}
            <div className="w-full lg:w-1/2 h-full relative">
              <img
                src={book?.image}
                alt="New Book Launch"
                className="w-full h-full object-cover rounded-lg shadow-xl border-4"
                onError={(e) => (e.currentTarget.src = errorbook)} 
              />
              {/* Discount Badge */}
              {
                book?.offers && (
                  <div className="absolute top-4 right-4 bg-[#FF4C60] text-white text-lg font-bold px-3 py-1 rounded-lg shadow-md">
                    {book?.offers}% OFF
                  </div>
                )
              }
            </div>

            {/* Right Side - Book Details */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 text-gray-800">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C765E]">
                New Launch - {book.title}
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600">
                Discover the amazing story of this new release! Dive deep into the world of adventure, mystery, and breathtaking twists that will keep you hooked till the very end.
              </p>

              <Link to={`/allbooks/${book._id}`}>
                <button className="bg-[#4C765E] text-white hover:bg-[#3b5f4e] rounded-lg mt-4 w-full sm:w-1/2 text-xl py-2">
                  Show Details
                </button>
              </Link>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default NewLaunchBook;
