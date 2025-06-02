import { AuthStudent } from "@/entities/student";

type signInAPIRequest = {
  id: string;
  password: string;
}

type signInAPIResponse = AuthStudent

type refreshAPIRequest = void;

type refreshAPIResponse = AuthStudent

export type {
  signInAPIRequest,
  signInAPIResponse,
  refreshAPIRequest,
  refreshAPIResponse
}
