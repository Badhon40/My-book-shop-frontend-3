import AdminDashboard from "../Pages/Admin/AdminDashboard";
import UpdateBook from "../Pages/Admin/UpdateBook";
import CreateBook from "../Pages/Admin/CreateBook";
import AdminProduct from "../Pages/Admin/AdminProduct";

const AdminRoutes = [
  {
    path:"dashboard",
    name: "Admin Dashboard",
    element:<AdminProduct />,
  },
  {
    path: "products",
    name: "Product Management",
    element: <AdminDashboard />,
  },

  {
    element: <CreateBook />,
    path: "/admin/products/create-book",
  },
  {
    element: <UpdateBook />,
    path: "update-book/:id",
  },
];

export default AdminRoutes;
