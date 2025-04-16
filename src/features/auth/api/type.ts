import { AuthStudent } from "@/entities/student";

type signInAPIRequest = {
  loginType: 'STUDENT';
  id: string;
  password: string;
}

type signInAPIResponse = AuthStudent

type refreshAPIRequest = {
  refreshToken: string;
}

type refreshAPIResponse = AuthStudent

export type {
  signInAPIRequest,
  signInAPIResponse,
  refreshAPIRequest,
  refreshAPIResponse
}
