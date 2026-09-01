import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../shared/Loader/Loader";

function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <Loader label="Checking your permissions" fullScreen />;
  if (!user || !isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
}

export default AdminRoute;
