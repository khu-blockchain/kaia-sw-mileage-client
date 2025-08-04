import type { StudentResponse } from "../student";

type TokenDetails = {
	token: string;
	expires_in: number;
};

type SignInRequest = {
	studentId: string;
	password: string;
};

type SignInResponse = StudentResponse & {
	access_token: TokenDetails;
};

type RefreshTokenResponse = StudentResponse & {
	access_token: TokenDetails;
};

export type {
	TokenDetails,
	SignInRequest,
	SignInResponse,
	RefreshTokenResponse,
};
