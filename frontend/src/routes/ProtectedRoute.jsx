import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../lib/session";

function ProtectedRoute({ children }) {
  const user = useCurrentUser();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
