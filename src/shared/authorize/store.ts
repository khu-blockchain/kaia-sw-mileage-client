import { create } from "zustand";

interface State {
	accessToken: string | null;
}

interface Actions {
	actions: {
		setAccessToken: (token: string) => void;
		clearAccessToken: () => void;
		getAccessToken: () => string | null;
	};
}

const initialState: State = {
	accessToken: null,
};

export const useAuthStore = create<State & Actions>((set, get) => ({
	...initialState,
	actions: {
		setAccessToken: (token: string) => set({ accessToken: token }),
		clearAccessToken: () => set({ accessToken: null }),
		getAccessToken: () => get().accessToken,
	},
}));
