import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Logo from "../../assets/Logo";
import { useNavigate } from "react-router-dom";
import loginWallpaper from "../../assets/loginWallpaper.webp";

interface LoginData {
    email: string;
    password: string;
}
const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values: LoginData) => {
        console.log("Received values of form: ", values.email, values.password);
        navigate("/home");
    };

    return (
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
                                <a href="">Forgot password</a>
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
    );
};
export default Login;