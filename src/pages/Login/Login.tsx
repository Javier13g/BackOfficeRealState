import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import Logo from "../../assets/Logo";
import { useNavigate } from "react-router-dom";
import loginWallpaper from "../../assets/loginWallpaper.webp";
import LoginService from "../../services/login/LoginService";
import { useAuthStore } from "../../store/useAuthStore";
import NotificationMessage from "../../components/NotificationMessage";
import { useState } from "react";

interface LoginData {
    email: string;
    password: string;
}
const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);

    const onFinish = (values: LoginData) => {
        setLoading(true);
        LoginService.login(values.email, values.password)
            .then((response) => {

                // Guarda el token en Zustand
                login(response.token, response.email, response.name, response.image);

                // Muestra una notificación de éxito
                NotificationMessage({
                    type: "success",
                    message: response.message,
                    description: "Has iniciado sesión correctamente, ¡Bienvenido " + response.name + "!",
                });

                navigate("/home");
            })
            .catch((error) => {
                console.error("Login failed", error);

                // Muestra una notificación de error
                NotificationMessage({
                    type: "error",
                    message: `Error de inicio de sesión (${error.statusCode})`,
                    description: error.message,
                });

                setLoading(false);
            }).finally(() => {
                // Restablece el estado de carga
                setLoading(false);
            }
            );
    };
    return (
        <Spin spinning={loading} size="large" tip="Loading...">
            <div style={{ display: "flex", height: "100vh" }}>
                {/* Left side with background image */}
                <div
                    style={{
                        flex: 1,
                        backgroundImage: `url(${loginWallpaper})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>

                {/* Right side with login form */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#ffffff", // White background
                    }}
                >
                    <div
                        style={{
                            maxWidth: 360,
                            width: "100%",
                            textAlign: "center",
                        }}
                    >
                        <Logo />
                        <Form
                            name="login"
                            initialValues={{ remember: true }}
                            style={{
                                marginTop: "16px",
                                padding: "24px",
                                borderRadius: "8px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                backgroundColor: "#ffffff",
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: "Please input your Email!" },
                                    { type: "email", message: "The input is not a valid email!" },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Please input your Password!" }]}
                            >
                                <Input
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <a href="#" onClick={() => navigate("/recovery")}>Forgot password</a>
                                </div>
                            </Form.Item>

                            <Form.Item>
                                <Button block type="primary" htmlType="submit">
                                    Log in
                                </Button>
                                or <a href="">Register now!</a>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </Spin>
    );
};
export default Login;