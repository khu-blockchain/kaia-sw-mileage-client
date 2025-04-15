import { Student } from "@/entities";

type signUpRequest = {
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
  // personalInformationConsentStatus: number;
};

type signUpResponse = Student;

export type { signUpRequest, signUpResponse };
