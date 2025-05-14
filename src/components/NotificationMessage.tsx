import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationMessageProps {
    type: NotificationType;
    message: string;
    description?: string;
}

const NotificationMessage = ({ type, message, description }: NotificationMessageProps) => {
    notification[type]({
        message,
        description,
        placement: "topRight", // Puedes cambiar la posición (topLeft, bottomLeft, bottomRight)
    });
};

export default NotificationMessage;