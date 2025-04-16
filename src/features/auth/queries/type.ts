import { AuthStudent } from "@/entities/student";

type useRefreshRequest = void;

type useRefreshResponse = AuthStudent

type useSignInRequest = {
  id: string;
  password: string;
}

type useSignInResponse = AuthStudent

export type {
  useRefreshRequest,
  useRefreshResponse,
  useSignInRequest,
  useSignInResponse
}
