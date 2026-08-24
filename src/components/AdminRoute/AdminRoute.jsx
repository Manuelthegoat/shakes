import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div className="route-loading">Loading...</div>;
  if (!user || !isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
}

export default AdminRoute;