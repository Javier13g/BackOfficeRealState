import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationMessageProps {
    type: NotificationType;
    message: string;
    description?: string;
    duration?: number;
}

const NotificationMessage = ({ type, message, description, duration }: NotificationMessageProps) => {
    notification[type]({
        message,
        description,
        duration,
        placement: "topRight", // Puedes cambiar la posición (topLeft, bottomLeft, bottomRight)
    });
};

export default NotificationMessage;