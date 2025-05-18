import { useGetAllUsersQuery } from "../../Redux/Features/Auth/authApi";
import { useGetAllOrdersQuery } from "../../Redux/Features/Orders/Order.api";
import { useGetAllbooksQuery } from "../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useMemo } from "react";

const AdminProduct = () => {
  // Fetch data from APIs
  const { data: ordersData } = useGetAllOrdersQuery(undefined);
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const { data: booksData } = useGetAllbooksQuery(undefined);

  // Mock best seller (replace with your API logic)
  const bestSeller = useMemo(() => {
    if (!booksData?.data?.length) return null;
    // Example: sort by a 'sold' field, descending
    return [...booksData.data].sort((a, b) => (b.sold || 0) - (a.sold || 0))[0];
  }, [booksData]);

  // Handle unauthorized or loading states
  if (
    usersData?.message === "you are not authorized" ||
    ordersData?.message === "you are not authorized" ||
    booksData?.message === "you are not authorized"
  ) {
    return (
      <div className="text-red-600 text-center mt-10">
        You are not authorized to view this page.
      </div>
    );
  }

  // Mock monthly sales data (replace with your API data)
  const monthlySales = [
    { month: "Jan", sales: 120 },
    { month: "Feb", sales: 98 },
    { month: "Mar", sales: 150 },
    { month: "Apr", sales: 80 },
    { month: "May", sales: 170 },
    { month: "Jun", sales: 140 },
  ];

  const cards = [
    {
      title: "Total Products",
      value: booksData?.data?.length || 0,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Total Users",
      value: usersData?.data?.length || 0,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Total Orders",
      value: ordersData?.data?.length || 0,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
        {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mb-10">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`rounded-lg shadow p-8 flex flex-col items-center ${card.color}`}
          >
            <div className="text-3xl font-bold mb-2">{card.value}</div>
            <div className="text-lg font-semibold">{card.title}</div>
          </div>
        ))}
      </div>

      {/* Monthly Sales Graph */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#4C765E" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Best Seller Card */}
      {bestSeller && (
        <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6 flex items-center gap-6">
          <img
            src={bestSeller.image || "https://via.placeholder.com/80"}
            alt={bestSeller.title}
            className="w-20 h-28 object-cover rounded"
          />
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">{bestSeller.title}</h4>
            <p className="text-gray-700 mb-1">Sold: <span className="font-semibold">{bestSeller.sold || 0}</span></p>
            <p className="text-gray-500">{bestSeller.author}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;