import { create } from "zustand";
import { persist } from "zustand/middleware";
import LoginService from "../services/login/AuthService";

interface AuthState {
  email: string | null;
  name: string | null;
  image: string | null;
  isAuthenticated: boolean;
  login: (email: string, name: string, image: string) => void;
  reset: () => void;
  isValidateToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      name: null,
      image: null,
      isAuthenticated: false,
      login: (email, name, image) => {
        set({
          email,
          name,
          image,
          isAuthenticated: true,
        });
      },
      reset: () =>
        set({
          email: null,
          name: null,
          image: null,
          isAuthenticated: false,
        }),
      isValidateToken: async () => {
        try {
          const isValid = await LoginService.isValidateToken();
          set({ isAuthenticated: isValid });
          if (!isValid) {
            set({ email: null, name: null, image: null });
          }
        } catch {
          set({ isAuthenticated: false, email: null, name: null, image: null });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
