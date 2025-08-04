import type { APIPromise } from "../types";
import type { SignUpRequest, SignUpResponse, StudentResponse } from "./dto";

import { StudentServer } from "../route";

export const studentApi = {
	signUp: (request: SignUpRequest): APIPromise<SignUpResponse> =>
		StudentServer.post("", {
			json: request,
		}).json(),

	getMe: (): APIPromise<StudentResponse> => StudentServer.get("me").json(),
};
