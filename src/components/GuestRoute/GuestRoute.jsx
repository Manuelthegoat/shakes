import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../shared/Loader/Loader";

function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader label="Checking your session" fullScreen />;
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}

export default GuestRoute;  
