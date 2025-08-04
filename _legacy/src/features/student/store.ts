import { AuthStudent } from "@/entities/student";
import { TokenType } from "@/entities/auth";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState: AuthStudent = {
  student: {
    student_id: "",
    name: "",
    wallet_address: "",
    email: "",
    phone_number: "",
    department: "",
    bank_account_number: "",
    bank_code: "",
    student_hash: "",
  },
  tokens: [
    {
      token: "",
      expires: "",
      token_type: TokenType.ACCESS,
    },
    {
      token: "",
      expires: "",
      token_type: TokenType.REFRESH,
    },
  ],
};

export const useStudentStore = create(
  combine(initialState, (set, get) => ({
    actions: {
      setStudent: (authStudent: AuthStudent) => set({ ...authStudent }),
      getStudent: () => get().student,
      getToken: () => get().tokens,
      reset: () => set(initialState),
    },
  }))
);
