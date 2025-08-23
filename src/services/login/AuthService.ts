import request from "../axios";

export const LoginService = {
  login: async (email: string, password: string) => {
    return await request("auth/login", "POST", { email, password }, { withCredentials: true });
  },
  logout: async () => {
    return await request("auth/logout", "POST", undefined, {
      withCredentials: true,
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
  registerUser: async (
    email: string,
    name: string,
    lastName: string,
    cardId: string,
    address: string,
    phoneNumber: string,
    password: string
  ) => {
    return await request("auth/register", "POST", {
      email,
      name,
      lastName,
      cardId,
      address,
      phoneNumber,
      password,
    });
  }
};

export default LoginService;
