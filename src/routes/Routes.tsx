import * as React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import { Spin } from "antd";
import RecoveryPage from "../pages/Recovery/Recovery";
import Register from "../pages/register/Register";

const UserPage = React.lazy(() => import("../pages/user/UserPage"));
const UserDetail = React.lazy(() => import("../pages/user/detail/DetailUser"));
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
                    <Route path="/register" element={<Register />} />

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
                            path="usuarios"
                            element={
                                <PrivateRoute>
                                    <UserPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="usuarios/detalleusuario/:userId"
                            element={
                                <PrivateRoute>
                                    <UserDetail />
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