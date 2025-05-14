import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    token: string | null;
    email: string | null;
    name: string | null;
    image: string | null;
    isAuthenticated: boolean;
    login: (token: string, email: string, name: string, image: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            email: null,
            name: null,
            image: null,
            isAuthenticated: false,
            login: (token: string, email: string, name: string, image: string) =>
                set({ token, email, name, image, isAuthenticated: true }),
            logout: () => set({ token: null, email: null, name: null, isAuthenticated: false }),
        }),
        {
            name: "auth-storage", // Nombre de la clave en localStorage
        }
    )
);