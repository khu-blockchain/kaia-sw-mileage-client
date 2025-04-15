import { StudentWithToken, TokenType } from "@/entities";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState: StudentWithToken = {
  student: {
    student_id: "",
    name: "",
    wallet_address: "",
    email: "",
    phone_number: "",
    department: "",
    bank_account_number: "",
    bank_code: "",
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
      setStudent: (studentWithToken: StudentWithToken) => set({ ...studentWithToken }),
      getStudent: () => get().student,
      getToken: () => get().tokens,
      reset: () => set(initialState),
    },
  }))
);
