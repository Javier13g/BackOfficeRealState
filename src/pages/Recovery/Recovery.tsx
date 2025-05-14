import { Button, Input, Typography } from "antd";
import loginWallpaper from "../../assets/loginWallpaper.webp";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const RecoveryPage = () => {
    const navigate = useNavigate();
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
                    <Typography.Paragraph style={{ textAlign: "center" }}>
                        Ingresa tu correo electrónico para recibir un enlace de recuperación.
                    </Typography.Paragraph>
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Correo Electrónico"
                        style={{ marginBottom: "16px" }}
                    />
                    <Button type="primary" block>
                        Enviar Enlace de Recuperación
                    </Button>
                    <Button
                        type="link"
                        style={{ marginTop: "16px", textAlign: "center" }}
                        onClick={() => {
                            navigate("/");
                        }}>
                        Regresar a Inicio de Sesión
                    </Button>
                </div>
            </div>
        </div >
    );
}
export default RecoveryPage;