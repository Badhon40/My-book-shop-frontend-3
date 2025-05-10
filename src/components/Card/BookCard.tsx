import { Link } from "react-router-dom";
import errorbook from "../../assets/4735.jpg";

export type TBook = {
  _id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  inStock: boolean;
  image: string;
};

export type BookCardProps = {
  book: TBook;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-400">
      {/* Image Container */}
      <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => (e.currentTarget.src = errorbook)}
        />

        {/* Stock Status Badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
            book.inStock ? "bg-green-500/90" : "bg-red-500/90"
          } text-white`}
        >
          {book.inStock ? "Available" : "Sold Out"}
        </span>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 bg-[#4C765E] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          ${book.price.toFixed(2)}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2 leading-tight">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            by {book.author || "N/A"}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full capitalize">
            {book.category}
          </span>

         
        </div>
         <Link
            to={`/allbooks/${book._id}`}
            >
            <button className="w-full bg-[#4C765E] text-white hover:bg-[#477059] rounded-lg mt-4 py-2 text-sm font-semibold transition duration-300">
              View Details
            </button>

          </Link>
      </div>
    </div>
  );
};

export default BookCard;
