import { Button, Form, Input, Typography } from "antd";
import loginWallpaper from "../../assets/loginWallpaper.webp";
import {
  MailOutlined,
  UserOutlined,
  IdcardOutlined,
  HomeOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginService from "../../services/login/AuthService";
import NotificationMessage from "../../components/NotificationMessage";
import type { register } from "../../types/register";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values: register) => {
    setLoading(true);
    LoginService.registerUser(
      values.email,
      values.name,
      values.lastName,
      values.cardId,
      values.address,
      values.phoneNumber,
      values.password
    )
      .then((response) => {
        NotificationMessage({
          type: "success",
          message: response.message,
          description: "Registro exitoso, por favor espere a que se active su cuenta.",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration failed", error);
        // Muestra una notificación de error
        NotificationMessage({
          type: "error",
          message: `Error de registro (${error.statusCode})`,
          description: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
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
            Eres nuevo aquí? Regístrate
          </Typography.Title>

          <div>
            <Form
              name="register"
              onFinish={onFinish}
              style={{ marginTop: "16px" }}
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Correo Electrónico"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu correo electrónico",
                  },
                  {
                    type: "email",
                    message: "Por favor ingresa un correo válido",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Correo Electrónico"
                />
              </Form.Item>
              <Form.Item
                name="name"
                label="Nombre"
                rules={[
                  { required: true, message: "Por favor ingresa tu nombre" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nombre" />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Apellido"
                rules={[
                  { required: true, message: "Por favor ingresa tu apellido" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Apellido" />
              </Form.Item>
              <Form.Item
                name="cardId"
                label="Cédula de Identidad"
                rules={[
                  { required: true, message: "Por favor ingresa tu cédula" },
                  {
                    pattern: /^[0-9]{11}$/,
                    message: "Por favor ingresa un número de cédula válido",
                  },
                  {
                    validator: async (_, value) => {
                      if (!value || value.length !== 11) {
                        return Promise.reject(
                          new Error("La cédula debe tener 11 dígitos")
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  prefix={<IdcardOutlined />}
                  placeholder="Cédula de Identidad"
                />
              </Form.Item>
              <Form.Item
                name="address"
                label="Dirección"
                rules={[
                  { required: true, message: "Por favor ingresa tu dirección" },
                ]}
              >
                <Input prefix={<HomeOutlined />} placeholder="Dirección" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Teléfono"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu número de teléfono",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Solo se permiten números",
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Teléfono" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa tu contraseña",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Contraseña"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  //loading={loading}
                >
                  Registrarse
                </Button>
              </Form.Item>
            </Form>
          </div>
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

export default Register;
