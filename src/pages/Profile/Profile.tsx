import {
    Form,
    Input,
    Button,
    Card,
    Typography,
    Avatar,
    Col,
    Row,
} from "antd";
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    IdcardOutlined,
    HomeOutlined,
    LockOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import useSWR from "swr";
import type { User } from "../../types/user";
import { useAuthStore } from "../../store/useAuthStore";
import UserService from "../../services/users/UserService";
import ResultComponent from "../../components/Result";
import { useEffect } from "react";

const { Title } = Typography;

const Profile = () => {
    const idUser = useAuthStore((state) => state.idUser);
    const { data, error, isLoading } = useSWR<User>(
        idUser ? ["user", idUser] : null,
        () => UserService.getUserById(idUser ?? ""),
    );

    console.log(isLoading)

    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data.name ?? "",
                lastName: data.lastName ?? "",
                email: data.email ?? "",
                cardId: data.cardId ?? "",
                address: data.address ?? "",
                phoneNumber: data.phoneNumber ?? "",
                password: "",
                userImg: data.userImg ?? "",
            });
        }
    }, [data, form]);

    if (error) {
        return <ResultComponent {...error} />;
    }

    // const handleFinish = (values: User) => {
    //     // Aquí iría la lógica para actualizar el perfil
    // };


    return (
        <div>
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 0,
                }}
            >
                <Card
                    style={{
                        width: "100%",
                        height: "100%",
                        maxWidth: "100vw",
                        maxHeight: "100%",
                        borderRadius: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: 32,
                        margin: "0 auto"
                    }}
                >
                    {" "}
                    <div style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <div style={{ textAlign: "center", marginBottom: 24 }}>
                            <Avatar size={64} icon={<UserOutlined />} src={data?.userImg} />
                            <Title level={3} style={{ marginTop: 16 }}>
                                Editar Perfil
                            </Title>
                        </div>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={(values) => {
                                console.log("Form values:", values);
                                // Aquí iría la lógica para actualizar el perfil
                            }}
                            style={{ width: "100%" }}
                            initialValues={{
                                name: data?.name ?? "",
                                lastName: data?.lastName ?? "",
                                email: data?.email ?? "",
                                cardId: data?.cardId ?? "",
                                address: data?.address ?? "",
                                phoneNumber: data?.phoneNumber ?? "",
                                password: "",
                                userImg: data?.userImg ?? "",
                            }}
                        >
                            <Row gutter={[32, 32]}>
                                <Col span={8}>
                                    <Form.Item
                                        label="Nombre"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Por favor ingresa tu nombre",
                                            },
                                        ]}
                                        style={{ marginBottom: 32 }}
                                    >
                                        <Input prefix={<UserOutlined />} placeholder="Nombre" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Apellido"
                                        name="lastName"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Por favor ingresa tu apellido",
                                            },
                                        ]}
                                        style={{ marginBottom: 32 }}
                                    >
                                        <Input prefix={<UserOutlined />} placeholder="Apellido" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Correo electrónico"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Por favor ingresa tu correo",
                                            },
                                            { type: "email", message: "Correo no válido" },
                                        ]}
                                        style={{ marginBottom: 32 }}
                                    >
                                        <Input
                                            prefix={<MailOutlined />}
                                            placeholder="Correo electrónico"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Cédula"
                                        name="cardId"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Por favor ingresa tu cédula",
                                            },
                                        ]}
                                        style={{ marginBottom: 32 }}
                                    >
                                        <Input prefix={<IdcardOutlined />} placeholder="Cédula" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Dirección"
                                        name="address"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Por favor ingresa tu dirección",
                                            },
                                        ]}
                                        style={{ marginBottom: 32 }}
                                    >
                                        <Input prefix={<HomeOutlined />} placeholder="Dirección" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Teléfono"
                                        name="phoneNumber"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Por favor ingresa tu teléfono",
                                            },
                                        ]}
                                        style={{ marginBottom: 32 }}
                                    >
                                        <Input prefix={<PhoneOutlined />} placeholder="Teléfono" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        label="Contraseña"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Por favor ingresa tu contraseña",
                                            },
                                        ]}
                                        style={{ marginBottom: 32 }}
                                    >
                                        <Input.Password
                                            prefix={<LockOutlined />}
                                            placeholder="Contraseña"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item
                                        label="Imagen de perfil"
                                        name="userImg"
                                        valuePropName="image"
                                        style={{ marginBottom: 32 }}
                                    >
                                        <Dragger
                                            name="file"
                                            action="/upload.do"
                                            listType="picture"
                                            maxCount={1}
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <UploadOutlined />
                                            </p>
                                            <p className="ant-upload-text">
                                                Haz clic o arrastra tu imagen aquí
                                            </p>
                                            <p className="ant-upload-hint">
                                                Soporta archivos JPG, PNG. Tamaño máximo 2MB.
                                            </p>
                                        </Dragger>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        <Button type="primary" htmlType="submit" block>
                                            Guardar Cambios
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
