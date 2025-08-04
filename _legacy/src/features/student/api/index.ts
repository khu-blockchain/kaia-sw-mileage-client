import { StudentServer, API } from "@/features/_core/api";
import {
  signUpAPIRequest,
  signUpAPIResponse,
  createWalletChangeAPIRequest,
  createWalletChangeAPIResponse,
  confirmWalletChangeAPIRequest,
  confirmWalletChangeAPIResponse,
} from "./type";

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

const createWalletChangeAPI: API<
  createWalletChangeAPIRequest,
  createWalletChangeAPIResponse
> = async (request) => {
  try {
    const result = await StudentServer.post(
      `${request.studentId}/wallet-change`,
      {
        json: { rawTransaction: request.rawTransaction },
      }
    ).json();
    return result as createWalletChangeAPIResponse;
  } catch (e) {
    throw e;
  }
};

const confirmWalletChangeAPI: API<
  confirmWalletChangeAPIRequest,
  confirmWalletChangeAPIResponse
> = async (request) => {
  try {
    const result = await StudentServer.post(
      `${request.studentId}/confirm-change`,
      {
        json: { rawTransaction: request.rawTransaction },
      }
    ).json();
    return result as confirmWalletChangeAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { signUpAPI, createWalletChangeAPI, confirmWalletChangeAPI };
