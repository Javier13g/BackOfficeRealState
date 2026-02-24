import request from "../axios";

export const RoleService = {
  getRoles: async () => {
    return await request("roles", "GET", undefined, {
      withCredentials: true,
    });
  },
};

export default RoleService;
