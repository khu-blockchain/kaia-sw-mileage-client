import { ActivityField } from "@/entities/document";
import { SwMileage, SwMileageFile } from "@/entities/document";

type getActivityFieldAPIRequest = void;

type getActivityFieldAPIResponse = ActivityField;

type applySwMileageAPIRequest = FormData;

type applySwMileageAPIResponse = {
  swMileage: SwMileage;
  swMileageFiles: Array<SwMileageFile>;
};

//TODO: Pagination 추가
type getSwMileageListAPIRequest = {
  studentId?: string;
  status?: number;
};

type getSwMileageListAPIResponse = Array<SwMileage>;

type getSwMileageDetailAPIRequest = {
  swMileageId: number;
};

type getSwMileageDetailAPIResponse = SwMileage;

export type {
  getActivityFieldAPIRequest,
  getActivityFieldAPIResponse,
  applySwMileageAPIRequest,
  applySwMileageAPIResponse,
  getSwMileageListAPIRequest,
  getSwMileageListAPIResponse,
  getSwMileageDetailAPIRequest,
  getSwMileageDetailAPIResponse,
};
