import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;