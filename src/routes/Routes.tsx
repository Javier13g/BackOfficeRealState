import * as React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Test = React.lazy(() => import("../pages/Test"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const HomePage = React.lazy(() => import("../pages/Login/home/HomePage"));

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<HomePage />}>
                        <Route path="test" element={<Test />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;