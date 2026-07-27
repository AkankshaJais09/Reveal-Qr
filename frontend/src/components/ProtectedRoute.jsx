import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen bg-[#0B0D14] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-[#E53935]/20 border-t-[#E53935] animate-spin" />
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;