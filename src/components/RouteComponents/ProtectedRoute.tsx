import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { logout, useCurrentToken } from "../../Redux/Features/Auth/authSlice";
import { verifyToken } from "../../Utils/verifyToken";
import { persistor } from "../../Redux/store";

type TProtectedRoute = {
  children: ReactNode;
  role?: string | string[];
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const user = verifyToken(token);

  // If token is invalid, logout the user
  if (!user) {
    dispatch(logout());
    persistor.purge();
    return <Navigate to="/login" replace />;
  }

  // Authorization Check
  const isAuthorized =
    !role || (Array.isArray(role) ? role.includes(user?.role ?? "") : user?.role === role);

  if (!isAuthorized) {
    dispatch(logout());
    persistor.purge();
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
