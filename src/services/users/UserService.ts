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
};

export default UserService;
