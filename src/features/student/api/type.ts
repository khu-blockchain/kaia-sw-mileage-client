import { Student } from "@/entities/student";

type signUpAPIRequest = {
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
  personalInformationConsentStatus: number;
};

type signUpAPIResponse = Student;

export type { signUpAPIRequest, signUpAPIResponse };
