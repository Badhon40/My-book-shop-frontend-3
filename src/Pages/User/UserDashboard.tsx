import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../Redux/hook";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "../../Redux/Features/Auth/authApi";
import { useGetOrdersByEmailQuery } from "../../Redux/Features/Orders/Order.api";

export interface IProduct {
  _id: string;
  title: string;
  author: string;
  // Add more product fields if needed
}
export interface IUser {
  _id: string;
  email: string;
  name: string;
  // Add more fields if needed
}
export interface IOrder {
  user?: IUser;
  products: {
    productId: IProduct;
    quantity: number;
  }[];
  totalPrice: number;
  email: string;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const UserDashboard = () => {
  const [updatePassword] = useUpdatePasswordMutation();
  const userEmail = useAppSelector((state) => state.auth.user?.email);
  const { data } = useGetOrdersByEmailQuery(undefined);

  console.log(data);
  const { register, handleSubmit, reset } = useForm();
  const handleUpdatePassword: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const res = await updatePassword({
        email: data.email,
        oldPassword: data.password,
        newPassword: data.newPassword,
      }).unwrap();
      console.log(res);
      toast.success("Password updated successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update password");
    }
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-16">
        <div className="">
          {" "}
          <input
            className="w-[400px] px-4 py-3 rounded-lg shadow-md"
            placeholder="Search users..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-10">
          {" "}
          <IoMdNotificationsOutline
            size={25}
            className="cursor-pointer text-gray-500 hover:text-black"
          ></IoMdNotificationsOutline>
          <FiUser
            size={30}
            className="cursor-pointer text-orange-500 bg-orange-100 rounded"
          ></FiUser>
        </div>
      </div>

      {/* The Tap  */}
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-border bg-base-300 rounded-lg">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab "
          aria-label="My Orders "
          defaultChecked
        />
        <div className="tab-content  bg-base-100 p-10 rounded-lg">
          <div>
            <h1 className="py-4 text-lg">
              Manage Order : ({data?.data?.length}){" "}
            </h1>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              {data?.data.length > 0 ? (
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr className="bg-base-200">
                      <th>Author Name </th>
                      <th>Book Title </th>
                      <th>Email</th>
                      <th>Order Status</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data.map((orderItem: IOrder,index:number) => (
                      <tr className="border border-gray-300" key={index}>
                        <td>{orderItem.products[0]?.productId?.author }</td>
                        <td>{orderItem.products[0]?.productId?.title }</td>
                        <td>{orderItem?.user?.email}</td>
                        <td>{orderItem?.status}</td>
                        <td>{orderItem.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-2xl py-20 font-semibold">
                  You currently don't have any order! 😔
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Profile  */}

        <input
          type="radio"
          name="my_tabs_2"
          className="tab"
          aria-label="Profile Setting"
        />
        <div className="tab-content  bg-base-100 rounded-lg p-10">
          <div>
            <div className="card bg-base-100  w-[40%] mx-auto shrink-0 shadow-2xl">
              <div className="card-body">
                <h1 className="text-center font-bold text-2xl text-[#1f1f1f]">
                  Update Password
                </h1>
                <form
                  onSubmit={handleSubmit(handleUpdatePassword)}
                  className="fieldset"
                >
                  <label className="fieldset-label">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    className=" px-4 py-2 border rounded-sm"
                    placeholder="Email"
                    defaultValue={userEmail}
                  />
                  <label className="fieldset-label">Old Password</label>
                  <input
                    {...register("password")}
                    type="password"
                    className="px-4 py-2 border rounded-sm"
                    placeholder="Password"
                  />
                  <label className="fieldset-label">New Password</label>
                  <input
                    {...register("newPassword")}
                    type="password"
                    className="px-4 py-2 border rounded-sm"
                    placeholder="New Password"
                  />

                  <button
                    type="submit"
                    className="bg-orange-500 text-white hover:bg-orange-600 w-full text-center font-semibold py-2 rounded-lg mt-3"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;