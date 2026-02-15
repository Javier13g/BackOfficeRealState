import { create } from "zustand";
import { persist } from "zustand/middleware";
import LoginService from "../services/login/AuthService";

interface AuthState {
  email: string | null;
  name: string | null;
  image: string | null;
  idUser: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (email: string, name: string, image: string, idUser: string, role: string) => void;
  reset: () => void;
  isValidateToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      name: null,
      image: null,
      idUser: null,
      role: null,
      isAuthenticated: false,
      login: (email, name, image, idUser, role) => {
        set({
          email,
          name,
          image,
          idUser,
          role,
          isAuthenticated: true,
        });
      },
      reset: () =>
        set({
          email: null,
          name: null,
          image: null,
          idUser: null,
          role: null,
          isAuthenticated: false,
        }),
      isValidateToken: async () => {
        try {
          const isValid = await LoginService.isValidateToken();
          set({ isAuthenticated: isValid });
          if (!isValid) {
            set({ email: null, name: null, image: null, idUser: null, role: null });
          }
        } catch {
          set({ isAuthenticated: false, email: null, name: null, image: null, idUser: null, role: null });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);