import { Button, Select } from "antd";
import { useState } from "react";
import {
  useGetAllUsersQuery,
  useDeactivateUserMutation,
  useActivateUserMutation,
} from "../../Redux/Features/Admin/UserManagementApi/userManagement.api";
import moment from "moment";
import {
  useDeleteABookMutation,
  useGetAllbooksQuery,
} from "../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import {
  useGetAllOrdersQuery,
  useGetOrdersByEmailQuery,
  useUpdateOrderStatusMutation,
  useVerifyOrderMutation,
} from "../../Redux/Features/Orders/Order.api";
import { IResponseBook, TransactionDetails, User } from "../../Types/global";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const ManageAdmin = () => {
  const [activeTab, setActiveTab] = useState("manageUser");
  const { data: Users, refetch } = useGetAllUsersQuery(undefined);
  const [updateOrderStatus] = useUpdateOrderStatusMutation(undefined);
  const [verifyOrder] = useVerifyOrderMutation(undefined);
  const [deactivateUser ,{data:deactiveUser}] = useDeactivateUserMutation();
  const [activateUser] = useActivateUserMutation();
  const { data: AllOrders } = useGetAllOrdersQuery(undefined);

  console.log("all orders", AllOrders);
  // const { refetch } = useGetAllbooksQuery();
  const navigate = useNavigate();
  const { data: Orders } = useGetOrdersByEmailQuery(undefined, {
    skip: activeTab !== "manageOrder",
  });
  const { data: Books } = useGetAllbooksQuery(undefined);
  console.log("allboks", Books);
  const tabs = [
    { id: "manageUser", label: "Manage User", count: Users?.data?.length || 0 },
    {
      id: "manageProducts",
      label: "Manage Products",
      count: Books?.data?.length || 0,
    },
    {
      id: "manageOrder",
      label: "Manage Order",
      count: AllOrders?.data?.length || 0,
    },
  ];
 
  console.log(Books);
  const [deleteBook, { data, error, isLoading }] =   useDeleteABookMutation(); // Remove undefined
  console.log("error", error, data);
  const handleAction = async (data: string) => {
    const [_id, actionType] = data.split("-");
    console.log("inside handleAction", _id, actionType);

    if (actionType === "delete") {
      try {
        const result = await deleteBook(_id).unwrap(); // Add .unwrap()
        console.log("Book deleted successfully:", result);
        refetch();
      } catch (error) {
        console.error("Failed to delete book:", error);
        // message.error("Failed to delete book");
      }
    } else {
      navigate(`/admin/update-book/${_id}`);
    }
  };

  const handleChangeOrderStatus = async (data: string) => {
    // console.log(data);
    const [_id, status] = data.split("-");
    const toastId = toast.loading("Updating status...");
    // console.log(_id, actionType);
    let result;
    if (status !== "Paid") {
      result = await updateOrderStatus({ _id, status });
    } else {
      const orderId = _id;
      result = await verifyOrder(orderId);
    }
    toast.success("Status updated successfully", { id: toastId });
    console.log(result);
  };

  console.log('deactived user ',deactiveUser)

  console.log("orders", Orders);
  return (
    <section className=" lg:ml-3">
      <div className="lg:px-8 lg:py-6">
        <div className="space-x-1  rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 px-4 py-2.5 text-sm font-medium duration-500 
                ${
                  activeTab === tab.id
                    ? "bg-transparent border-b-2 border-[#e12503] text-[#e12503] shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200 hover:rounded-md"
                }
                transition-all duration-200
              `}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>
      {/* Manage User */}
      <div
        className={`tab-content bg-white px-8 py-4 rounded-md   mt-8 ${
          activeTab === "manageUser" ? "block" : "hidden"
        }`}
      >
        <div className="container px-4 mx-auto">
          <p className="text-[18px] mb-4">
            Manage User ({Users?.data?.length})
          </p>
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          User Status
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Joined Date
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Name
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Email
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Role
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {Users?.data?.map((user: User) => (
                        <tr key={user.id}>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                                user.activity === "activated"
                                  ? "bg-emerald-100/60 text-emerald-500"
                                  : "bg-red-100/60 text-red-500"
                              }`}
                            >
                              <h2 className="text-sm font-normal">
                                {user.activity.toUpperCase()}
                              </h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            {moment(user.createdAt).format("YYYY-MM-DD")}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                              <div>
                                <h2 className="text-sm font-medium text-gray-800 dark:text-white">
                                  {user.name}
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">
                              {user.email}
                            </p>
                          </td>
                          <td
                            className={`px-4 py-4 text-sm whitespace-nowrap ${
                              user.role === "admin"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {user.role.toUpperCase()}
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <Button
                                onClick={async () =>
                                  await activateUser(user._id)
                                }
                                className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
                              >
                                Activate
                              </Button>
                              <Button
                                onClick={async () =>
                                  await deactivateUser(user._id)
                                }
                                className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                              >
                                Deactivate
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Products */}
      <div
        className={`tab-content bg-white px-8 py-4 rounded-md   mt-8 ${
          activeTab === "manageProducts" ? "block" : "hidden"
        }`}
      >
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[18px] ">
              Manage Products ({Books?.data?.length})
            </p>
            <Link to={"create-book"}>
              <button className="bg-[#4C765E] text-white hover:bg-[#4C765E] py-2 px-3 rounded-md">
                Add New Book
              </button>
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Title
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Author
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Category
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Price
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Quantity
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <span className="">In Stock</span>
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <span className="">Actions</span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {Books &&
                        Books?.data?.map(
                          ({
                            title,
                            author,
                            category,
                            price,
                            quantity,
                            inStock,
                            _id,
                          }: IResponseBook) => (
                            <tr key={_id}>
                              <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                  <span>{title}</span>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {author}
                              </td>
                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div
                                  className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 `}
                                >
                                  <h2 className="text-sm font-normal">
                                    {category}
                                  </h2>
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                <span>{price}</span>
                              </td>
                              <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {quantity}
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className="flex items-center gap-x-6">
                                  {inStock ? "Yes" : "No"}
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <Select
                                  defaultValue="Edit"
                                  style={{ width: 120 }}
                                  onChange={handleAction}
                                  loading={isLoading} // Show loading state
                                  options={[
                                    { value: `${_id}-update`, label: "Edit" },
                                    {
                                      value: `${_id}-delete`,
                                      label: isLoading
                                        ? "Deleting..."
                                        : "Delete",
                                      disabled: isLoading, // Disable while deleting
                                    },
                                  ]}
                                />
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Order */}
      <div
        className={`tab-content bg-white px-8 py-4 rounded-md  mt-8 ${
          activeTab === "manageOrder" ? "block" : "hidden"
        }`}
      >
        <div className="container px-4 mx-auto">
          <p className="text-[18px] mb-4">
            Manage Order ({AllOrders?.data?.length})
          </p>
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Customer Email
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Order Status
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Total Price
                        </th>
                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Ordered At
                        </th>

                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <span className="">Change Status</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {AllOrders?.data?.map(
                        ({
                          user,
                          _id,
                          status,
                          totalPrice,
                          createdAt,
                          transaction,
                        }: TransactionDetails) => (
                          <tr key={_id}>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {user?.email}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 `}
                              >
                                <h2 className="text-sm font-normal">
                                  {status || transaction?.transactionStatus}
                                </h2>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <span>${totalPrice}</span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {moment(createdAt).format("YYYY-MM-DD")}
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <Select
                                defaultValue={
                                  status || transaction?.transactionStatus
                                }
                                value={status || transaction?.transactionStatus}
                                style={{ width: 120 }}
                                onChange={(data) =>
                                  handleChangeOrderStatus(data)
                                }
                                options={[
                                  {
                                    value: `${_id}-Completed`,
                                    label: "Completed",
                                  },
                                  { value: `${_id}-Shipped`, label: "Shipped" },
                                  {
                                    value: `${transaction?.id}-Paid`,
                                    label: "Paid",
                                    disabled: status == "Paid",
                                  },
                                ]}
                              />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageAdmin;
