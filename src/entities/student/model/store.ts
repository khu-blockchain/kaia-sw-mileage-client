import type { Student } from "./types";

import { atom } from "recoil";

export const studentState = atom<Student | null>({
	key: "student",
	default: null,
});