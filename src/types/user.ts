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
  cardId?: string | null;
}

export interface PutProfileUser {
  email: string;
  name: string;
  lastName: string;
  image?: string | null;
  userImg?: Array<{
    uid?: string;
    name?: string;
    status?: string;
    url?: string;
    originFileObj?: File;
  }>;
  cardId?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  password?: string;
}

export interface PutUser extends PutProfileUser {
  roleId: string;
}