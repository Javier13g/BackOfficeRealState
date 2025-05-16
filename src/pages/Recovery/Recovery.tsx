import { Button, Input, Typography, Form, Steps } from "antd";
import loginWallpaper from "../../assets/loginWallpaper.webp";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginService from "../../services/login/AuthService";
import NotificationMessage from "../../components/NotificationMessage";

const { Step } = Steps;

const RecoveryPage = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [recoveryCode, setRecoveryCode] = useState("");

    const onEmailSubmit = (values: { email: string }) => {
        setLoading(true);
        LoginService.sendEmail(values.email)
            .then((response) => {
                NotificationMessage({
                    type: "success",
                    message: response.message,
                    description: "Revisa tu correo para el enlace de recuperación.",
                    duration: 5,
                });
                setEmail(values.email);
                setCurrentStep(1);
            })
            .catch((error) => {
                console.error("Error al enviar el correo", error);
                NotificationMessage({
                    type: "error",
                    message: `Error al enviar el correo (${error.statusCode})`,
                    description: error.message,
                    duration: 5,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onOtpSubmit = (values: { otp: string }) => {
        setLoading(true);
        setRecoveryCode(values.otp);
        LoginService.validateOtp(email, values.otp)
            .then((response) => {
                NotificationMessage({
                    type: "success",
                    message: response.message,
                    description: "Código OTP verificado exitosamente.",
                    duration: 5,
                });
                setCurrentStep(2);
            })
            .catch((error) => {
                console.error("Error al validar el OTP", error);
                NotificationMessage({
                    type: "error",
                    message: `Error al validar el OTP (${error.statusCode})`,
                    description: error.message,
                    duration: 5,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onPasswordSubmit = (values: { password: string }) => {
        LoginService.resetPassword(email, recoveryCode, values.password)
            .then((response) => {
                NotificationMessage({
                    type: "success",
                    message: response.message,
                    description: "Tu contraseña ha sido actualizada exitosamente.",
                    duration: 5,
                });
                navigate("/");
            })
            .catch((error) => {
                console.error("Error al actualizar la contraseña", error);
                NotificationMessage({
                    type: "error",
                    message: `Error al actualizar la contraseña (${error.statusCode})`,
                    description: error.message,
                    duration: 5,
                });
            });
    };

    return (
        <div
            className="recovery-container"
            style={{ backgroundImage: `url(${loginWallpaper})` }}
        >
            <div className="recovery-content">
                <div
                    style={{
                        padding: "24px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#ffffff",
                        maxWidth: "400px",
                    }}
                >
                    <Typography.Title level={3} style={{ textAlign: "center" }}>
                        Recuperar Contraseña
                    </Typography.Title>
                    <Steps current={currentStep} style={{ marginBottom: "24px" }}>
                        <Step title="Correo Electrónico" />
                        <Step title="Código OTP" />
                        <Step title="Nueva Contraseña" />
                    </Steps>
                    {currentStep === 0 && (
                        <div>
                            <Typography.Paragraph style={{ textAlign: "center" }}>
                                Ingresa tu correo electrónico para recibir un enlace de recuperación.
                            </Typography.Paragraph>
                            <Form
                                name="recovery"
                                onFinish={onEmailSubmit}
                                style={{ marginTop: "16px" }}
                            >
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: "Por favor ingresa tu correo electrónico" },
                                        { type: "email", message: "Por favor ingresa un correo válido" },
                                    ]}
                                >
                                    <Input
                                        prefix={<MailOutlined />}
                                        placeholder="Correo Electrónico"
                                        style={{ marginBottom: "16px" }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        block
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        Enviar Enlace de Recuperación
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                    {currentStep === 1 && (
                        <div>
                            <Typography.Paragraph style={{ textAlign: "center" }}>
                                Ingresa el código OTP de 6 dígitos que enviamos a tu correo: <strong>{email}</strong>.
                            </Typography.Paragraph>
                            <Form
                                name="otp"
                                onFinish={onOtpSubmit}
                                style={{ marginTop: "16px" }}
                            >
                                <Form.Item
                                    name="otp"
                                    rules={[
                                        { required: true, message: "Por favor ingresa el código OTP" },
                                        { len: 6, message: "El código OTP debe tener 6 dígitos" },
                                    ]}
                                >
                                    <Input.OTP
                                        style={{ marginBottom: "16px" }}
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" block htmlType="submit">
                                        Verificar Código
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div>
                            <Typography.Paragraph style={{ textAlign: "center" }}>
                                Ingresa tu nueva contraseña para tu cuenta.
                            </Typography.Paragraph>
                            <Form
                                name="new-password"
                                onFinish={onPasswordSubmit}
                                style={{ marginTop: "16px" }}
                            >
                                <Form.Item
                                    name="password"
                                    rules={[
                                        { required: true, message: "Por favor ingresa tu nueva contraseña" },
                                        { min: 8, message: "La contraseña debe tener al menos 8 caracteres" },
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="Nueva Contraseña"
                                        style={{ marginBottom: "16px" }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" block htmlType="submit">
                                        Actualizar Contraseña
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                    <Button
                        type="link"
                        style={{ textAlign: "center", marginTop: "16px" }}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Regresar a Inicio de Sesión
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RecoveryPage;