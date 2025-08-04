import { API, WalletServer } from "@/features/_core/api";
import {
  checkHasNotConfirmedWalletLostAPIRequest,
  checkHasNotConfirmedWalletLostAPIResponse,
  createWalletLostAPIRequest,
  createWalletLostAPIResponse,
} from "./type";

const createWalletLostAPI: API<
  createWalletLostAPIRequest,
  createWalletLostAPIResponse
> = async (request) => {
  try {
    const result = await WalletServer.post("", {
      json: { ...request },
    }).json();
    return result as createWalletLostAPIResponse;
  } catch (e) {
    throw e;
  }
};

const checkHasNotConfirmedWalletLostAPI: API<
  checkHasNotConfirmedWalletLostAPIRequest,
  checkHasNotConfirmedWalletLostAPIResponse
> = async (request) => {
  try {
    const result = await WalletServer.get(`${request.studentId}/check`).json();
    return result as checkHasNotConfirmedWalletLostAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { createWalletLostAPI, checkHasNotConfirmedWalletLostAPI };
