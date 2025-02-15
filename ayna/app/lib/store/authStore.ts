import { create } from "zustand";

interface AuthState {
  userId: string | null;
  setUser: (userId: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  setUser: (userId) => set({ userId }),
}));
