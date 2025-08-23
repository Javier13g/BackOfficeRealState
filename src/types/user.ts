export interface StatusUser {
  id: string;
  statusName: string;
}

export interface Role {
    id: string;
    name: string;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string | null;
  numberAttempts: number;
  role: Role | null;
  roleId: string | null;
  statusId: string | null;
  statusUser: StatusUser | null;
  userImg?: string | null;
}