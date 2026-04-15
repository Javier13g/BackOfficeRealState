import { Result } from "antd";
import type { ErrorResponse } from "../types/error";

const ResultComponent = (error: ErrorResponse) => {
    switch (error.statusCode) {
        case 400:
            console.error("Error 400: Bad Request");
            return (
                <Result
                    status="error"
                    title="400"
                    subTitle={error.message}
                />
            );
        case 401:
            console.error("Error 401: Unauthorized");
            return (
                <Result
                    status="error"
                    title="401"
                    subTitle={error.message}
                />
            );
        case 403:
            console.error("Error 403: Forbidden");
            return (
                <Result
                    status="403"
                    title="403"
                    subTitle={error.message}
                />
            );
        case 404:
            console.error("Error 404: Not Found");
            return (
                <Result
                    status="404"
                    title="404"
                    subTitle={error.message}
                />
            );
        case 500:
            console.error("Error 500: Internal Server Error");
            return (
                <Result
                    status="500"
                    title="500"
                    subTitle={error.message}
                />
            );
        default:
            console.error("Error desconocido");
            return (
                <Result
                    status="error"
                    title="Error desconocido"
                    subTitle="Lo sentimos, ocurrió un error inesperado."
                />
            );
    }
}

export default ResultComponent;