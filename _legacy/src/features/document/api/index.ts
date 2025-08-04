import {
  AcademicFieldServer,
  API,
  makeQuery,
  SwMileageServer,
} from "@/features/_core/api";
import {
  getActivityFieldAPIRequest,
  getActivityFieldAPIResponse,
  applySwMileageAPIRequest,
  applySwMileageAPIResponse,
  getSwMileageListAPIRequest,
  getSwMileageListAPIResponse,
  getSwMileageDetailAPIRequest,
  getSwMileageDetailAPIResponse,
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

const applySwMileageAPI: API<
  applySwMileageAPIRequest,
  applySwMileageAPIResponse
> = async (request) => {
  try {
    const result = await SwMileageServer.post(``, { body: request }).json();
    return result as applySwMileageAPIResponse;
  } catch (e) {
    throw e;
  }
};

const getSwMileageListAPI: API<
  getSwMileageListAPIRequest,
  getSwMileageListAPIResponse
> = async (request) => {
  try {
    const result = await SwMileageServer.get(`${makeQuery(request)}`).json();
    return result as getSwMileageListAPIResponse;
  } catch (e) {
    throw e;
  }
};

const getSwMileageDetailAPI: API<
  getSwMileageDetailAPIRequest,
  getSwMileageDetailAPIResponse
> = async (request) => {
  try {
    const result = await SwMileageServer.get(`${request.swMileageId}`).json();
    return result as getSwMileageDetailAPIResponse;
  } catch (e) {
    throw e;
  }
};
export {
  getActivityFieldAPI,
  applySwMileageAPI,
  getSwMileageListAPI,
  getSwMileageDetailAPI,
};
