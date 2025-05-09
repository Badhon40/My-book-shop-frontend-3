import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCreateOrderMutation } from "../../Redux/Features/Orders/Order.api";

const Success = () => {
  const navigate = useNavigate();
  const [createOrder, { data, error }] = useCreateOrderMutation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const orderPlacedRef = useRef(false); // 👈 persist across renders

  useEffect(() => {
    if (sessionId && !orderPlacedRef.current) {
      orderPlacedRef.current = true; // ✅ prevent re-entry

      fetch(`http://localhost:5000/checkout-session/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Checkout session data:", data);
          createOrder({
            user: data.userId, // Ensure you are sending ObjectId of the user
            products: [
              {
                productId: data.productId,
                quantity: parseInt(data.productQuantity),
                title: "test", // New
                author: "tesd", // New
              },
            ],
            totalPrice: parseFloat(data.productPrice),
            status: "Paid",
            transaction: {
              id: sessionId,
              transactionStatus: data.paymentStatus,
              method: "card", // or from data if available
              date_time: new Date().toISOString(),
            },
            userEmail: data.userEmail, // ⬅️ You may also store this if needed
          });
        })
        .catch((error) =>
          console.error("Error fetching payment details:", error)
        );
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful! 🎉
        </h1>
        <p className="mt-2 text-gray-700">Thank you for your purchase.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
