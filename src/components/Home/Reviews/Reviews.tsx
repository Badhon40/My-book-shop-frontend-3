import { useEffect, useState } from "react";
import { useGetReviewQuery } from "../../../Redux/Features/Review/reviewApi";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export interface IReview {
  _id: string;
  bookId: string;
  name: string;
  rating: number;
  reviewMessage: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: reviewData } = useGetReviewQuery(undefined);

  useEffect(() => {
    if (reviewData?.success) {
      setReviews(reviewData.data);
    }
  }, [reviewData]);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  // For desktop infinite scroll
  const duplicatedReviews = [...reviews, ...reviews];

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={18}
          fill={i < rating ? "currentColor" : "none"}
          className={`${i < rating ? "text-yellow-500" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            What Our Readers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover experiences from our valued customers
          </p>
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="md:hidden relative">
          {reviews.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-[#4C765E] flex items-center justify-center text-white font-bold">
                  {reviews[currentIndex]?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {reviews[currentIndex]?.name}
                  </p>
                  <div className="flex">{renderStars(reviews[currentIndex]?.rating)}</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {reviews[currentIndex]?.reviewMessage}
              </p>
            </div>
          )}

          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={prevReview}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-green-600" />
            </button>
            <button
              onClick={nextReview}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-green-600" />
            </button>
          </div>
        </div>

        {/* Desktop Infinite Scroll */}
        <div className="hidden md:block relative overflow-hidden">
          <div className="py-4">
            <div className="animate-scroll-horizontal flex gap-8 w-max">
              {duplicatedReviews.map(({ _id, reviewMessage, name, rating }, idx) => (
                <div
                  key={`${_id}-${idx}`}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg min-w-[350px] max-w-[350px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-[#4C765E] flex items-center justify-center text-white text-xl font-bold">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                        {name}
                      </p>
                      <div className="flex mt-1">{renderStars(rating)}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    "{reviewMessage}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient fade effect */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 z-10"></div>
        </div>

        <style>{`
          .animate-scroll-horizontal {
            animation: scrollLeft 20s linear infinite;
          }

          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Reviews;