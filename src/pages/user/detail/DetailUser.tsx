import { Avatar, Card, Col, Row, Spin, Tag, Typography } from "antd";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import UserService from "../../../services/users/UserService";
import ResultComponent from "../../../components/Result";
import type { User } from "../../../types/user";

const DetailUser = () => {
    const { userId } = useParams();
    const { data, error, isLoading } = useSWR<User>(
        userId ? ["user", userId] : null,
        () => UserService.getUserById(userId ?? "")
    );

    const statusColorMap: Record<string, string> = {
        "Activo": "green",
        "Inactivo": "red",
        "Suspendido": "orange",
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '300px' }}>
                <Spin size="large" tip="Cargando perfil..." />
            </div>
        );
    }

    if (error) {
        return <ResultComponent {...error} />;
    }

    return (
        <div>
            <Card>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <Avatar size={100} src={data?.userImg} />
                    <div style={{ marginLeft: 16, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Typography.Title level={3} style={{ marginBottom: 0 }}>
                            {data?.name} {data?.lastName}
                        </Typography.Title>
                        <Typography.Title level={5} style={{ marginTop: 4 }}>
                            {data?.role?.name}
                        </Typography.Title>
                    </div>
                </div>
                <Typography.Title level={4}>Información del Usuario</Typography.Title>
                <Row gutter={16}>
                    <Col span={12}>
                        <Typography.Title level={5}>Email</Typography.Title>
                        <Typography.Paragraph>{data?.email}</Typography.Paragraph>
                    </Col>
                    <Col span={12}>
                        <Typography.Title level={5}>Teléfono</Typography.Title>
                        <Typography.Paragraph>{data?.phoneNumber}</Typography.Paragraph>
                    </Col>
                    <Col span={12}>
                        <Typography.Title level={5}>Dirección</Typography.Title>
                        <Typography.Paragraph>{data?.address}</Typography.Paragraph>
                    </Col>
                    <Col span={12}>
                        <Typography.Title level={5}>Estado</Typography.Title>
                        <Tag style={{ fontSize: 14}} color={statusColorMap[data?.statusUser?.statusName || ""]}>
                            {data?.statusUser?.statusName || "N/A"}
                        </Tag>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default DetailUser;
