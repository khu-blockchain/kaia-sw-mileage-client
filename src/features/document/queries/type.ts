import { ActivityField } from "@/entities/activity_field";
import { SwMileage, SwMileageFile } from "@/entities/sw_mileage";

type useGetActivityFieldRequest = void;

type useGetActivityFieldResponse = ActivityField;

type useApplySwMileageRequest = FormData;

type useApplySwMileageResponse = {
  swMileage: SwMileage;
  swMileageFiles: Array<SwMileageFile>;
};

export type {
  useGetActivityFieldRequest,
  useGetActivityFieldResponse,
  useApplySwMileageRequest,
  useApplySwMileageResponse,
};
