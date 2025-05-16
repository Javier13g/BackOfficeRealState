import request from "../axios";

export const LoginService = {
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
  sendEmail: async (email: string) => {
    return await request("email/send-password-reset", "POST", { email });
  },
  validateOtp: async (email: string, recoveryCode: string) => {
    return await request("auth/validate-recovery-code", "POST", {
      email,
      recoveryCode,
    });
  },
  resetPassword: async (
    email: string,
    recoveryCode: string,
    newPassword: string
  ) => {
    return await request("auth/reset-password", "PUT", {
      email,
      recoveryCode,
      newPassword,
    });
  },
};

export default LoginService;
