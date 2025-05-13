import { useState } from "react";
import { usePostReviewMutation } from "../../Redux/Features/Review/reviewApi"; 

const ReviewPopup = ({
  bookId,
  onClose,
}: {
  bookId: string | undefined;
  onClose: () => void;
}) => {
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [postReview] = usePostReviewMutation();


  const handleSubmit = async () => {
    if (!reviewMessage || rating === 0) {
      alert("Please provide a rating and a review message.");
      return;
    }

    const response = await postReview({
      bookId,
      reviewMessage,
      rating,
    });
    if (response.error) {
      alert("Failed to submit review. Please try again.");
    } else {
      alert("Review submitted successfully!");
      onClose();
    }
    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          Write a Review
        </h2>
        <textarea
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          placeholder="Write your review here..."
          className="w-full p-3 border rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
        ></textarea>
        <div className="flex items-center mb-4">
          <span className="mr-2 text-gray-700 dark:text-gray-300">Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-xl ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;