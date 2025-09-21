import { Breadcrumb, Tag, Typography } from "antd";
import useSWR from "swr";
import { EditFilled, EyeFilled } from "@ant-design/icons";
import UserService from "../../services/users/UserService";
import ResultComponent from "../../components/Result";
import type { User } from "../../types/user";
import TableComponent from "../../components/Table";
import { useNavigate } from "react-router-dom";

const fetcher = () => UserService.getUsers();

const UserPage = () => {
    const navigate = useNavigate();
    const { data, error, isLoading } = useSWR(["users"], fetcher);

    console.log("Error:", error);

    if (error) {
        return <ResultComponent {...error} />;
    }

    const dataSource = data?.data?.map((user: User) => ({
        key: user.id,
        name: user.name + " " + user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        status: user?.statusUser?.statusName || "N/A",
        role: user?.role?.name || "N/A",
    })) || [];

    const statusColorMap: Record<string, string> = {
        "Activo": "green",
        "Inactivo": "red",
        "Suspendido": "orange",
        // Puedes agregar más estados aquí en el futuro
    };


    console.log("DataSource:", dataSource);
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => (
                <Tag color={role?.toLowerCase() === "administrador" ? "blue" : role?.toLowerCase() === "user" ? "green" : "default"}>
                    {role}
                </Tag>
            ),
        },
        {
            title: 'Teléfono',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={statusColorMap[status] || "default"}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (record: unknown) => {
                const user = record as { key: string };
                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <EyeFilled width={16} height={16} onClick={() => {
                            console.log("Ver usuario:", user);
                            navigate("/home/usuarios/detalleusuario/" + user.key);
                        }} />
                        <EditFilled width={16} height={16} onClick={() => {
                            console.log("Editar usuario:", user);
                            navigate("/home/usuarios/editarusuario/" + user.key);
                        }} />
                    </div>
                );
            }
        },
    ];
    return (
        <div>
            <Breadcrumb />
            <Typography.Title level={2}>Lista de Usuarios</Typography.Title>
            <TableComponent columns={columns} data={dataSource} loading={isLoading} />
        </div>
    );
};

export default UserPage;