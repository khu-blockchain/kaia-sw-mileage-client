import { StudentWithToken } from "@/entities";

type signInRequest = {
  loginType: 'STUDENT';
  id: string;
  password: string;
}

type signInResponse = StudentWithToken

type refreshRequest = {
  refreshToken: string;
}

type refreshResponse = StudentWithToken

export type {
  signInRequest,
  signInResponse,
  refreshRequest,
  refreshResponse
}
