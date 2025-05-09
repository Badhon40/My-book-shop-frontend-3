
import { loadStripe } from "@stripe/stripe-js";
import {  useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../Redux/Features/Auth/authSlice";
import Loader from "../loader/Loader";

const BookDetailsSkeleton = () => {
  const { bookId } = useParams();
  const user = useSelector(selectCurrentUser);
  const { data: book, isLoading } = useGetSingleBookQuery(bookId);
  console.log("product id", bookId);
  console.log(book);
  if (isLoading) {
    return <Loader></Loader>;
  }

  const makePayment = async () => {
    // if (!user) {
    //   // Redirect to login and remember current location
    //   Navigate("/login", { state: { from: location } });
    //   return;
    // }
    // setLoading(true);
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
    console.log("session", session);

    const result = await stripe?.redirectToCheckout({
      sessionId: session?.id,
    });
    // setLoading(false);
    console.log("payment result", result);

    if (result && result.error) {
      console.log(result.error);
    }
  };
  return (
    <div className="container lg:w-[80%] mx-auto p-6 h-screen mt-10">
      <div className="flex justify-center  gap-20  items-center">
        <div className="rounded-lg flex-1 overflow-hidden shadow-lg">
          <img
            src={
              book?.data?.img ||
              "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=754&fit=clip"
            }
            alt={book?.data?.title}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#4C765E]">
            {book?.data?.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">by {book?.data?.author}</p>

          <div className="mt-4 flex gap-4">
             <h2 className="text-sm  text-[#4C765E]">
            {book?.data?.publicationDate || "N/A"}
          </h2>
           <h2 className="text-sm text-[#4C765E]">
            {book?.data?.category || "N/A"}
          </h2>
           <h2 className="text-sm text-[#4C765E]">
            {book?.data?.publisher || "N/A"}
          </h2>
          </div>

          <p className="mt-4 text-gray-700">{book?.data?.description}</p>

          <div className="mt-6">
            <span className="text-2xl font-bold text-[#4C765E]">
              ${book?.data?.price}
            </span>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={makePayment}
              className="btn btn-primary bg-[#4C765E] border-none hover:bg-[#477059]"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsSkeleton;
