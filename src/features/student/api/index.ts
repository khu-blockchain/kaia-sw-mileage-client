import { StudentServer, API } from "@/features/_core/api";
import { signUpAPIRequest, signUpAPIResponse } from "./type";

const signUpAPI: API<signUpAPIRequest, signUpAPIResponse> = async (request) => {
  try {
    const result = await StudentServer.post("", {
      json: { ...request },
    }).json();
    return result as signUpAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { signUpAPI };
