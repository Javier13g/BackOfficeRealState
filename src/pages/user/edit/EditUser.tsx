import useSWR, { mutate } from "swr";
import UserService from "../../../services/users/UserService";
import type { PutUser, Role, User } from "../../../types/user";
import { Avatar, Button, Card, Col, Form, Input, Row, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultComponent from "../../../components/Result";
import Title from "antd/es/typography/Title";
import { HomeOutlined, IdcardOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import NotificationMessage from "../../../components/NotificationMessage";
import RoleService from "../../../services/roles/RoleService";

const EditUser = () => {
  const fetcher = () => RoleService.getRoles();
  const { userId } = useParams();
  const [loadingButton, setLoadingButton] = useState(false);
  const { data, error, isLoading } = useSWR<User>(
    userId ? ["user", userId] : null,
    () => UserService.getUserById(userId ?? ""),
  );
  const { data: dataRoles, error: errorRoles, isLoading: isLoadingRole } = useSWR<Role[]>(["roles"], fetcher);
  console.log("Roles obtenidos:", dataRoles);

  useEffect(() => {
    if (errorRoles) {
      NotificationMessage({
        type: "error",
        message: "Error al cargar roles",
        description: errorRoles.message || "No se pudieron obtener los roles disponibles",
      });
    }
  }, [errorRoles]);

  const dataSelectRoles = dataRoles?.map((role: Role) => ({
    label: role.name,
    value: role.name,
  })) || [];

  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        roleId: data.role?.name,
        status: data.statusUser?.statusName,
        cardId: data.cardId,
      });
    }
  }, [data, form]);

  const onFinish = (values: PutUser) => {
    if (!userId) {
      NotificationMessage({
        type: "error",
        message: "Error",
        description: "No se encontró el usuario autenticado",
      });
      return;
    }
    setLoadingButton(true);
    const formData = new FormData();
    const textFields: (keyof PutUser)[] = ["name", "lastName", "email", "cardId", "address", "phoneNumber", "roleId"];

    textFields.forEach((field) => {
      const value = values[field];
      if (value && typeof value === 'string') { // Type Guard simple
        formData.append(field, value);
      }
    });
    UserService.updateUser(userId, formData)
      .then(() => {

        NotificationMessage({
          type: "success",
          message: "Operación Exitosa",
          description: "Perfil actualizado correctamente",
        });

        mutate(["user", userId]);
      })
      .catch((error) => {
        NotificationMessage({
          type: "error",
          message: "Error",
          description: error?.message || "Error al actualizar el perfil",
        });
      })
      .finally(() => {
        setLoadingButton(false);
      });
  };

  if (error) {
    return <ResultComponent {...error} />;
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '300px' }}>
        <Spin size="large" tip="Cargando usuario..." />
      </div>
    );
  }
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
                Editar Usuario
              </Title>
            </div>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ width: "100%" }}
              initialValues={{
                name: data?.name ?? "",
                lastName: data?.lastName ?? "",
                email: data?.email ?? "",
                cardId: data?.cardId ?? "",
                address: data?.address ?? "",
                phoneNumber: data?.phoneNumber ?? "",
                role: data?.role?.name ?? "",
                status: data?.statusUser?.statusName ?? "",
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
                    label="Rol"
                    name="roleId" // Asegúrate de que tu interfaz PutProfileUser tenga este campo 'role'
                    rules={[{ required: true, message: "Por favor selecciona un rol" }]}
                    style={{ marginBottom: 32 }}
                  >
                    <Select placeholder="Selecciona un rol" loading={isLoadingRole} disabled={isLoadingRole}>
                      {dataSelectRoles.map((role) => (
                        <Select.Option key={role.value} value={role.value}>
                          {role.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loadingButton}
                      disabled={loadingButton}>
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

export default EditUser;
