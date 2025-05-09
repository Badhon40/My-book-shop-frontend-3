import { Link } from "react-router-dom";
import BookCard from "../../Card/BookCard";
import { useGetAllbooksQuery } from "../../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import Loader from "../../loader/Loader";
/* eslint-disable @typescript-eslint/no-explicit-any */

const NewArrival = () => {
  const { data, isLoading } = useGetAllbooksQuery(undefined);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="max-w-[90%]  mx-auto py-12 px-4">
      {/* Title & Subtitle Options (Choose one) */}
      <div className="text-center mb-14">
       
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
          New Literary Adventures Await
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Fresh stories to ignite your imagination
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 rounded-md gap-6">
        {data?.data.slice(0, 6).map((book: any) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      <div className="w-full p-5 flex justify-center">
        <Link
          to="/allbooks"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg mt-6 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Browse All
        </Link>
      </div>
    </section>
  );
};

export default NewArrival;