import { ActivityField } from "@/entities/activity_field";
import { SwMileage, SwMileageFile } from "@/entities/sw_mileage";

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
