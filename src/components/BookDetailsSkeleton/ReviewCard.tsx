import { Star } from "lucide-react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export interface IReview {
  _id: string;
  name: string;
  rating: number;
  reviewMessage: string;
  createdAt: string;
}

const ReviewCard = ({ review }: { review: IReview }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? "currentColor" : "none"}
          className={`${i < rating ? "text-yellow-500" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-4">
        <Avatar
          size={48}
          icon={<UserOutlined />}
          className="bg-green-100 text-green-600 dark:bg-gray-700 dark:text-green-400"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {review.name}
              </h4>
              <div className="flex items-center mt-1">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-gray-700 dark:text-gray-300">
            {review.reviewMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;