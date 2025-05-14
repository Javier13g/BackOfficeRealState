import axios, { type AxiosRequestConfig, type Method } from "axios";

// Configuración base de Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000, // Tiempo de espera en milisegundos
    headers: {
        'Content-Type': 'application/json',
    },
});

const request = async (
    endpoint: string,
    method: Method,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    config?: AxiosRequestConfig
) => {
    try {
        const response = await axiosInstance({
            url: endpoint,
            method,
            data,
            ...config,
        });
        return response.data; // Devuelve solo los datos de la respuesta
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw error.response?.data || error.message; // Lanza el error para manejarlo externamente
    }
};

export default request;