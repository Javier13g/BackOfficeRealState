import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  email: string | null;
  name: string | null;
  image: string | null;
  isAuthenticated: boolean;
  login: (email: string, name: string, image: string) => void;
  reset: () => void;
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
    }),
    {
      name: "auth-storage",
    }
  )
);