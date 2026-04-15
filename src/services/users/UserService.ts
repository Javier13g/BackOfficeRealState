import request from "../axios";

export const UserService = {
  getUsers: async () => {
    return await request("users", "GET", undefined, {
      withCredentials: true,
    });
  },
  getUserById: async (id: string) => {
    return await request(`users/${id}`, "GET", undefined, {
      withCredentials: true,
    });
  },
  updateUser: async (id: string, data: FormData) => {
    return await request(`users/${id}`, "PUT", data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  changeStatusUser: async (id: string, statusId: string) => {
    return await request(`users/${id}/status`, "PUT", { statusId }, {
      withCredentials: true,
    });
  },
};

export default UserService;
