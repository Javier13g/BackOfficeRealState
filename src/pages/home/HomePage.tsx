import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Dropdown } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import LoginService from '../../services/login/AuthService';

const { Header, Sider, Content } = Layout;

const HomePage = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const name = useAuthStore((state) => state.name);
    const image = useAuthStore((state) => state.image);
    const reset = useAuthStore((state) => state.reset);

    const menuItems = [
        {
            key: 'profile',
            label: 'Mi Perfil',
            onClick: () => navigate('/profile'), // Navega a la página de perfil
        },
        {
            key: 'logout',
            label: 'Cerrar Sesión',
            onClick: () => {
                LoginService.logout()
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .then((_response) => {
                        reset();
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error('Error al cerrar sesión:', error);
                    });
            },
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '16px 0', // Márgenes arriba y abajo
                    }}
                >
                    <Avatar
                        style={{
                            width: collapsed ? 50 : 130, // Tamaño dinámico según el estado del Sider
                            height: collapsed ? 50 : 130,
                            marginBottom: 16,
                            transition: 'all 0.3s ease', // Transición suave al colapsar
                        }}
                        src={image}
                    />
                    {collapsed ? null :
                        <span
                            style={{
                                color: '#fff',
                                fontSize: '16px', // Tamaño de fuente dinámico
                                transition: 'all 0.3s ease', // Transición suave al colapsar
                            }}
                        >
                            {name}
                        </span>
                    }

                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Usuarios',
                            onClick: () => navigate('usuarios'),
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'Mis propiedades',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: '0 16px',
                        background: colorBgContainer,
                        zIndex: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <Dropdown
                        menu={{ items: menuItems }}
                        placement="bottomRight"
                        trigger={['click']}
                    >
                        <Avatar
                            style={{
                                backgroundColor: '#87d068',
                                cursor: 'pointer',
                            }}
                        >
                            {name
                                ? name
                                    .split(' ') // Divide el nombre en palabras
                                    .map((word: string) => word.charAt(0).toUpperCase()) // Toma la primera letra de cada palabra y la convierte en mayúscula
                                    .join('') // Une las iniciales
                                : 'U'}
                        </Avatar>
                    </Dropdown>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default HomePage;