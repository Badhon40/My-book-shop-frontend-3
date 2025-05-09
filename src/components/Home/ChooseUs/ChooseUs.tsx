import { FaShippingFast, FaRedo, FaHeadset, FaStar } from "react-icons/fa";

const ChooseUs = () => {
    return (
        <div className="bg-gray-50 sm:pb-14 ">
      <div className="max-w-[90%] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl  font-bold text-gray-800 py-14">Why Choose Us?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <FaShippingFast className="text-4xl text-orange-600 mb-4" />
            <p className="font-medium text-xl">Free shipping over $50</p>
          </div>

          <div className="flex flex-col items-center">
            <FaRedo className="text-4xl text-orange-600 mb-4" />
            <p className="font-medium text-xl">30-day return policy</p>
          </div>

          <div className="flex flex-col items-center">
            <FaHeadset className="text-4xl text-orange-600 mb-4" />
            <p className="font-medium text-xl">24/7 customer support</p>
          </div>

          <div className="flex flex-col items-center">
            <FaStar className="text-4xl text-orange-600 mb-4" />
            <p className="font-medium text-xl">Thousands of 5-star reviews</p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default ChooseUs;