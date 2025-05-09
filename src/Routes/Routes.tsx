import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import NotFoundPage from "../components/404/NotFound";
import Home from "../components/Home/Home";
import AllBooks from "../Pages/Books/All Books/AllBooks";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import About from "../Pages/About/About";
//import Success from "../Pages/Payment/Success";
//import Failure from "../Pages/Payment/Failure";
//import { BookDetailsSkeleton } from "../components/BookDetailsSkeleton/BookDetailsSkeleton";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { routeGenerator } from "../Utils/routesGenerator";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoute";
import ProtectedRoute from "../components/RouteComponents/ProtectedRoute";
import BookDetailsSkeleton from "../components/BookDetailsSkeleton/BookDetailsSkeleton";
import Success from "../Pages/Payment/Success";
import Failure from "../Pages/Payment/Failure";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/allbooks",
        element: <AllBooks></AllBooks>,
      },
      {
        path: "/allbooks/:bookId",
        element: <BookDetailsSkeleton />,
      },
      {
        path: "/about",
        element: <About></About>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout></DashboardLayout>
      </ProtectedRoute>
    ),
    children: routeGenerator(AdminRoutes),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <DashboardLayout></DashboardLayout>
      </ProtectedRoute>
    ),
    children: routeGenerator(UserRoutes),
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/failed",
    element: <Failure />,
  },
]);

export default router;
