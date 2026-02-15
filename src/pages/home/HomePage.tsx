import React, { useState } from "react";
import {
  Layout,
  Menu,
  theme,
  Avatar,
  Dropdown,
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Tag,
  List,
  Button,
  Space,
  Typography,
} from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
  TeamOutlined,
  HomeOutlined,
  DollarOutlined,
  BellOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PieChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import LoginService from "../../services/login/AuthService";
import { useValidateTokenEffect } from "../../hooks/useValidateTokenEffect";
import { useAuthStore } from "../../store/useAuthStore";
import Breadcrumb from "../../components/Breadcrumb";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

// --- Datos Mock para el Dashboard ---
interface PropertyDataType {
  key: string;
  name: string;
  price: number;
  status: string;
  type: string;
  agent: string;
}

const recentProperties: PropertyDataType[] = [
  {
    key: "1",
    name: "Casa Moderna Centro",
    price: 350000,
    status: "En Venta",
    type: "Casa",
    agent: "Juan Perez",
  },
  {
    key: "2",
    name: "Apartamento Vista Mar",
    price: 1200,
    status: "Renta",
    type: "Apartamento",
    agent: "Ana Gomez",
  },
  {
    key: "3",
    name: "Oficina Corporativa",
    price: 450000,
    status: "Vendida",
    type: "Oficina",
    agent: "Carlos Ruiz",
  },
  {
    key: "4",
    name: "Terreno Industrial",
    price: 800000,
    status: "En Venta",
    type: "Terreno",
    agent: "Juan Perez",
  },
  {
    key: "5",
    name: "Loft Urbano",
    price: 950,
    status: "Renta",
    type: "Apartamento",
    agent: "Maria Diaz",
  },
];

const columns = [
  {
    title: "Propiedad",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <a href="">{text}</a>,
  },
  {
    title: "Tipo",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
    render: (price: number, record: PropertyDataType) => (
      <span>
        {record.status === "Renta"
          ? `$${price}/mes`
          : `$${price.toLocaleString()}`}
      </span>
    ),
  },
  {
    title: "Estado",
    key: "status",
    dataIndex: "status",
    render: (status: string) => {
      let color = "geekblue";
      if (status === "Vendida") color = "green";
      if (status === "Renta") color = "volcano";
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Agente",
    dataIndex: "agent",
    key: "agent",
  },
];

const activities = [
  {
    title: "Nueva oferta recibida",
    desc: "Cliente ofreció $340k por Casa Centro",
    time: "Hace 5 min",
  },
  {
    title: "Visita programada",
    desc: "Apartamento Vista Mar con Luis Torres",
    time: "Hace 2 hrs",
  },
  {
    title: "Propiedad vendida",
    desc: "Oficina Corporativa cerrada por Carlos",
    time: "Ayer",
  },
  {
    title: "Nuevo Lead",
    desc: "Interesado en propiedades de lujo",
    time: "Ayer",
  },
];

// Items del menú lateral
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Propiedades", "2", <HomeOutlined />),
  getItem("Agentes", "3", <UserOutlined />),
  getItem("Clientes", "4", <TeamOutlined />),
  getItem("Finanzas", "5", <DollarOutlined />),
  getItem("Reportes", "9", <FileOutlined />),
];

const HomePage: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  useValidateTokenEffect();

  const reset = useAuthStore((state) => state.reset);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  // Obtener datos del usuario desde el store
  const name = useAuthStore((state) => state.name);
  const image = useAuthStore((state) => state.image);

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Mi Perfil",
      icon: <UserOutlined />,
      onClick: () => navigate("/home/profile"),
    },
    {
      key: "settings",
      label: "Configuración",
      icon: <DesktopOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Cerrar Sesión",
      onClick: () => {
        LoginService.logout()
          .then(() => {
            reset();
            navigate("/");
          })
          .catch((error) => {
            console.error("Error al cerrar sesión:", error);
          });
      },
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  // Lógica para iniciales del usuario
  const userInitials = name
    ? name
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase())
        .join("")
        .substring(0, 2)
    : "U";

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "1") {
      navigate("/home");
    } else if (e.key === "3") {
      navigate("/home/usuarios");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* Logo Area & Avatar Lateral opcional */}
        <div
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
          }}
        >
          {/* Si está colapsado mostramos un icono simple, si no, mostramos la imagen grande como tenías antes */}
          {!collapsed ? (
            <>
              <Avatar
                size={64}
                src={image}
                style={{
                  marginBottom: 10,
                  border: "2px solid rgba(255,255,255,0.2)",
                }}
                icon={<UserOutlined />}
              >
                {userInitials}
              </Avatar>
              <Text strong style={{ color: "white" }}>
                CasaFacil BO
              </Text>
            </>
          ) : (
            <HomeOutlined
              style={{ color: "white", fontSize: "18px", marginBottom: 8 }}
            />
          )}
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
          selectedKeys={[location.pathname.includes("/usuarios") ? "3" : "1"]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Breadcrumb />
          <Space size="large">
            <Button
              type="text"
              icon={<BellOutlined style={{ fontSize: "18px" }} />}
            />
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Space style={{ cursor: "pointer" }}>
                <Avatar src={image} style={{ backgroundColor: "#87d068" }}>
                  {/* Mostrar iniciales si no hay imagen */}
                  {!image && userInitials}
                </Avatar>
                <span style={{ fontWeight: 500 }}>{name || "Usuario"}</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          {location.pathname === "/home" || location.pathname === "/home/" ? (
            <div style={{ padding: 24, minHeight: 360 }}>
              <div style={{ padding: 24, minHeight: 360 }}>
                {/* 1. SECCIÓN DE KPI / ESTADÍSTICAS */}
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12} lg={6}>
                    <Card style={{ border: "none" }}>
                      <Statistic
                        title="Propiedades Totales"
                        value={128}
                        prefix={<HomeOutlined />}
                        valueStyle={{ color: "#3f8600" }}
                      />
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        +5 nuevas esta semana
                      </Text>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} lg={6}>
                    <Card style={{ border: "none" }}>
                      <Statistic
                        title="Ingresos Mensuales"
                        value={92500}
                        precision={2}
                        prefix="$"
                        suffix={<ArrowUpOutlined />}
                        valueStyle={{ color: "#3f8600" }}
                      />
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        +12% vs mes anterior
                      </Text>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} lg={6}>
                    <Card style={{ border: "none" }}>
                      <Statistic
                        title="Visitas Agendadas"
                        value={45}
                        prefix={<UserOutlined />}
                        valueStyle={{ color: "#1677ff" }}
                      />
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        Para los próximos 7 días
                      </Text>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} lg={6}>
                    <Card style={{ border: "none" }}>
                      <Statistic
                        title="Contratos Pendientes"
                        value={8}
                        prefix={<FileOutlined />}
                        suffix={<ArrowDownOutlined />}
                        valueStyle={{ color: "#cf1322" }}
                      />
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        Requieren atención
                      </Text>
                    </Card>
                  </Col>
                </Row>

                <div style={{ marginTop: "24px" }}></div>

                {/* 2. TABLA PRINCIPAL Y SIDEBAR DE ACTIVIDAD */}
                <Row gutter={[16, 16]}>
                  <Col xs={24} lg={16}>
                    <Card
                      title="Propiedades Recientes"
                      extra={<a href="#">Ver todas</a>}
                      style={{ border: "none" }}
                    >
                      <Table
                        columns={columns}
                        dataSource={recentProperties}
                        pagination={{ pageSize: 5 }}
                      />
                    </Card>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Card
                      title="Actividad Reciente"
                      style={{ border: "none", height: "100%" }}
                    >
                      <List
                        itemLayout="horizontal"
                        dataSource={activities}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  style={{ backgroundColor: "#1677ff" }}
                                  icon={<BellOutlined />}
                                />
                              }
                              title={<a href="#">{item.title}</a>}
                              description={
                                <>
                                  <div>{item.desc}</div>
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: "11px" }}
                                  >
                                    {item.time}
                                  </Text>
                                </>
                              }
                            />
                          </List.Item>
                        )}
                      />
                      <Button type="primary" block style={{ marginTop: 16 }}>
                        Ver reporte completo
                      </Button>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          ) : (
            <div style={{ padding: 24, minHeight: 360 }}>
              <Outlet />
            </div>
          )}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          BackOffice Real Estate ©{new Date().getFullYear()} Created with Ant
          Design
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;
