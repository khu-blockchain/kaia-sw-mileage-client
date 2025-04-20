import { API, SwMileageTokenServer } from "@/features/_core/api";
import {
  getActiveSwMileageTokenAPIRequest,
  getActiveSwMileageTokenAPIResponse,
  getSWMileageTokenAPIRequest,
  getSWMileageTokenAPIResponse,
} from "./type";


const getActiveSwMileageTokenAPI: API<
  getActiveSwMileageTokenAPIRequest,
  getActiveSwMileageTokenAPIResponse
> = async () => {
  try {
    const result = await SwMileageTokenServer.get("activate").json();
    return result as getActiveSwMileageTokenAPIResponse;
  } catch (e) {
    throw e;
  }
}

const getSWMileageTokenAPI: API<
  getSWMileageTokenAPIRequest,
  getSWMileageTokenAPIResponse
> = async () => {
  try {
    const result = await SwMileageTokenServer.get("").json();
    return result as getSWMileageTokenAPIResponse;
  } catch (e) {
    throw e;
  }
};


export {
  getActiveSwMileageTokenAPI,
  getSWMileageTokenAPI,
};
