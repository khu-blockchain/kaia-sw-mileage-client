import type { Student } from "./types";

import { create } from "zustand";

interface State {
	student: Student | null;
}

interface Actions {
	actions: {
		setStudent: (student: Student) => void;
		clearStudent: () => void;
		getStudent: () => Student | null;
	};
}

const initialState: State = {
	student: null,
};

export const useStudentStore = create<State & Actions>((set, get) => ({
	...initialState,
	actions: {
		setStudent: (student: Student) => set({ student }),
		clearStudent: () => set({ student: null }),
		getStudent: () => get().student,
	},
}));
