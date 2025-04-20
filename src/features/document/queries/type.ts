import { ActivityField } from "@/entities/document";
import { SwMileage, SwMileageFile } from "@/entities/document";

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
