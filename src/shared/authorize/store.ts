import { create } from "zustand";

interface AuthStore {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	getAccessToken: () => string | null;
	reset: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
	accessToken: null,
	setAccessToken: (accessToken) => set({ accessToken }),
  getAccessToken: () => get().accessToken,
	reset: () => set({ accessToken: null }),
}));
