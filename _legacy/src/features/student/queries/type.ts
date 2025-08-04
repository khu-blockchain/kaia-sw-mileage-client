import { Student } from "@/entities/student";

type useSignUpRequest = {
  studentId: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
  phoneNumber: string;
  department: string;
  walletAddress: string;
  bankAccountNumber: string;
  bankCode: string;
  rawTransaction: string;
  studentHash: string;
};

type useSignUpResponse = Student;

export type { useSignUpRequest, useSignUpResponse };
