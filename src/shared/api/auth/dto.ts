import type { StudentResponse } from "../student";

type AccessToken = {
	access_token: string;
};

type SignInRequest = {
	studentId: string;
	password: string;
};

type SignInResponse = StudentResponse & AccessToken;

type RefreshTokenResponse = StudentResponse & AccessToken;

export type {
	SignInRequest,
	SignInResponse,
	RefreshTokenResponse,
};
