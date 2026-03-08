import type { Student } from "../student";
import type { AccessToken } from "./types";

type SignInRequest = {
	studentId: string;
	password: string;
};

type SignInResponse = Student & AccessToken;

type RefreshTokenResponse = Student & AccessToken;

export type { SignInRequest, SignInResponse, RefreshTokenResponse };
