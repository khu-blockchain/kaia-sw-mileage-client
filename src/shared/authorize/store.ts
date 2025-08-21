import { create } from "zustand";

interface AuthStore {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	accessToken: null,
	setAccessToken: (accessToken) => set({ accessToken }),
	reset: () => set({ accessToken: null }),
}));
