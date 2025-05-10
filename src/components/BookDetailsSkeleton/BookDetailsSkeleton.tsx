import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../Redux/Features/Auth/authSlice";
import Loader from "../loader/Loader";
import errorbook from "../../assets/4735.jpg";


const BookDetailsPage = () => {
  const { bookId } = useParams();
  const user = useSelector(selectCurrentUser);
  const { data: book, isLoading } = useGetSingleBookQuery(bookId);

  if (isLoading) {
    return <Loader />;
  }

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51NFeKsHXxHHqqBSEXEZ6oVqeAquqIpszGA5xvnGO3XSkrX53ffO3A2pRkRRuIhjoVvUKiFxBoC476BMmG8pr8GDK00kNXNphd6");

    const body = {
      product: book.data,
      user,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session?.id });
  };

  const CalculatePrice = (price: number, offer : number): number => {
   if (offer) {
      if (price > 100) {
        const discount =Math.round((price * offer) / 100);
        return price - discount;
      }
    }
    return price;
  };



  return (
    <div className="container mx-auto p-6 min-h-screen mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center">
        <div className="w-full h-full relative">
              <img
                src={book.image}
                alt="New Book Launch"
                className="w-full h-full object-cover rounded-lg shadow-xl border-4"
                onError={(e) => (e.currentTarget.src = errorbook)} 
              />
              {/* Discount Badge */}
              {
                book?.data?.price>100 && (
                  <div className="absolute top-4 right-4 bg-[#FF4C60] text-white text-lg font-bold px-3 py-1 rounded-lg shadow-md">
                    {book?.data?.offers}% OFF
                  </div>
                )
              }
            </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-[#4C765E]">
            {book?.data?.title}
          </h2>
          <p className="text-lg text-gray-600">by {book?.data?.author}</p>
          <p className="text-md text-gray-500">{book?.data?.category}</p>
          <p className="text-md text-gray-500">Published by: {book?.data?.publisher}</p>
          <p className="text-md text-gray-500">Published on: {new Date(book?.data?.publicationDate).toLocaleDateString()}</p>

          <p className="text-lg mt-4 text-gray-700">{book?.data?.description}</p>

          <div className="font-bold flex items-center gap-20 py-6">
           <span className="text-green-700 text-2xl">৳ {CalculatePrice(book?.data?.price, book?.data?.offers)}</span>
           {
            book?.data?.price>100 && (
              <span className="text-gray-500 text-lg line-through">৳{book?.data?.price}</span>  
            ) 
           }
          </div>
                {user?.role === "user" ? (
                  <button
                    onClick={makePayment}
                    className="bg-[#4C765E] text-white hover:bg-[#3b5f4e] rounded-lg mt-4 w-full md:w-1/2 text-xl py-2"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white rounded-lg mt-4 w-full md:w-1/2 text-xl py-2 cursor-not-allowed"
                  >
                    Only users can buy
                  </button>
                )}
          </div>

          
        </div>
      </div>
  
  );
};

export default BookDetailsPage;
