import { StudentServer, API } from "@/features/_api";
import { signUpRequest, signUpResponse } from "./types";

const signUpAPI: API<signUpRequest, signUpResponse> = async (request) => {
  try {
    const result = await StudentServer.post("", {
      json: {
        ...request,
        personalInformationConsentStatus: 1,
      },
    }).json();
    return result as signUpResponse;
  } catch (e) {
    throw e;
  }
};

export { signUpAPI };
