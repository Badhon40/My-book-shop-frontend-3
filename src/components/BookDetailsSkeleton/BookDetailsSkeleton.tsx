/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../Redux/hook";
import { selectCurrentUser } from "../../Redux/Features/Auth/authSlice";
import Loader from "../../components/loader/Loader";
import errorbook from "../../assets/4735.jpg";
import { useGetSingleBookQuery } from "../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const BookDetailsPage = () => {
  const user = useAppSelector(selectCurrentUser);
  const { bookId } = useParams<{ bookId: string }>();
  const { data: book, isLoading } = useGetSingleBookQuery(bookId);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const makePayment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsAdding(true);
    try {
      const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY!);

      const body = {
        product: book.data,
        user,
      };

      const response = await fetch(`${process.env.BASE_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create checkout session.");
      }

      const session = await response.json();
      const result = await stripe?.redirectToCheckout({
        sessionId: session?.id,
      });

      if (result?.error) {
        console.error("Stripe Checkout Error:", result.error.message);
        toast.error(result.error.message || "Failed to redirect to checkout.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to initiate payment.";
      toast.error(errorMessage);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="w-full p-6 min-h-screen mt-10">
      <div className= "mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center">
        <div className="w-full h-full relative">
          <img
            src={book?.data?.image}
            alt="New Book Launch"
            className="w-full h-full object-cover rounded-lg shadow-xl border-4"
            onError={(e) => (e.currentTarget.src = errorbook)}
          />
          {book?.data?.price > 100 && (
            <div className="absolute top-4 right-4 bg-[#FF4C60] text-white text-lg font-bold px-3 py-1 rounded-lg shadow-md">
              {book?.data?.offers}% OFF
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-[#4C765E]">
            {book?.data?.title}
          </h2>
          <p className="text-lg text-gray-600">by {book?.data?.author}</p>
          <p className="text-md text-gray-500">{book?.data?.category}</p>
          <p className="text-md text-gray-500">
            Published by: {book?.data?.publisher}
          </p>
          <p className="text-md text-gray-500">
            Published on:{" "}
            {new Date(book?.data?.publicationDate).toLocaleDateString()}
          </p>

          <p className="text-lg mt-4 text-gray-700">{book?.data?.description}</p>

          <div className="font-bold flex items-center gap-20 py-6">
            <span className="text-green-700 text-2xl">
              ৳ {book?.data?.price}
            </span>
            {book?.data?.price > 100 && (
              <span className="text-gray-500 text-lg line-through">
                ৳{book?.data?.price}
              </span>
            )}
          </div>
          {user?.role === "user" ? (
            <button
              onClick={makePayment}
              disabled={isAdding}
              className={`bg-[#4C765E] text-white hover:bg-[#3b5f4e] rounded-lg mt-4 w-full md:w-1/2 text-xl py-2 transition-all duration-300 ${
                isAdding ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isAdding ? "Processing..." : "Make Payment"}
            </button>
          ) : (
            <div className="bg-gray-400 text-white rounded-lg mt-4 w-full md:w-1/2 text-xl py-2 text-center cursor-not-allowed">
              Only users can buy
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;