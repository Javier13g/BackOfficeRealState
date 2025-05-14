import * as React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import { Spin } from "antd";
import RecoveryPage from "../pages/Recovery/Recovery";

const Test = React.lazy(() => import("../pages/Test"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const HomePage = React.lazy(() => import("../pages/home/HomePage"));

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    <Spin size="large" tip="Cargando..." />
                </div>
            }>
                <Routes>
                    {/* Ruta pública */}
                    <Route path="/" element={<Login />} />
                    <Route path="/recovery" element={<RecoveryPage />} />

                    {/* Rutas protegidas */}
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    >
                        <Route
                            path="test"
                            element={
                                <PrivateRoute>
                                    <Test />
                                </PrivateRoute>
                            }
                        />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;