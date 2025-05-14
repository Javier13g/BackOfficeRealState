import request from "../axios";

const LoginService = {
  login: async (email: string, password: string) => {
    return await request("auth/login", "POST", { email, password });
  },
  logout: async (token: string) => {
    return await request("auth/logout", "POST", undefined, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
      },
    });
  },
};

export default LoginService;
