import { AcademicFieldServer, API, SwMileageServer } from "@/features/_core/api";
import {
  getActivityFieldAPIRequest,
  getActivityFieldAPIResponse,
  applySwMileageAPIRequest,
  applySwMileageAPIResponse,
} from "./type";

const getActivityFieldAPI: API<
  getActivityFieldAPIRequest,
  getActivityFieldAPIResponse
> = async () => {
  try {
    const result = await AcademicFieldServer.get("").json();
    return result as getActivityFieldAPIResponse;
  } catch (e) {
    throw e;
  }
};

const applySwMileageAPI: API<applySwMileageAPIRequest, applySwMileageAPIResponse> = async(request) => {
  try{
    const result = await SwMileageServer.post(``, {body: request}).json();
    return result as applySwMileageAPIResponse;
  } catch (e) {
    throw e;
  }
};

export { getActivityFieldAPI, applySwMileageAPI };
