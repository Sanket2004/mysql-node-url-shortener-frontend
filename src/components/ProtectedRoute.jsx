import { useAuth } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    console.log("Protected Route user state: ", user);
    if (!user) {
        return <Navigate to={'/login'} />;
    }
    return children;
};

export default ProtectedRoute;
