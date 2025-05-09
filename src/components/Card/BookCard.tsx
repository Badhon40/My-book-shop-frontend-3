import { Link } from "react-router-dom";

export type TBook = {
  _id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  inStock: boolean;
  image: string;
};

type BookCardProps = {
  book: TBook;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-400">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            book.image ||
            "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg"
          }
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Stock Status Badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
            book.inStock
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          {book.inStock ? "Available" : "Sold Out"}
        </span>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
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
            by {book.author}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2.5 py-1 rounded-full capitalize">
            {book.category}
          </span>

          <Link
            to={`/allbooks/${book._id}`}
            className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-medium text-sm flex items-center transition-colors"
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
