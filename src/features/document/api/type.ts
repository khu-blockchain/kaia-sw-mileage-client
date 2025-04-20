import { ActivityField } from "@/entities/document";
import { SwMileage, SwMileageFile } from "@/entities/document";

type getActivityFieldAPIRequest = void;

type getActivityFieldAPIResponse = ActivityField;

type applySwMileageAPIRequest = FormData;

type applySwMileageAPIResponse = {
  swMileage: SwMileage;
  swMileageFiles: Array<SwMileageFile>;
};

export type {
  getActivityFieldAPIRequest,
  getActivityFieldAPIResponse,
  applySwMileageAPIRequest,
  applySwMileageAPIResponse,
};
