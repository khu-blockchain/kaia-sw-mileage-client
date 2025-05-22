import { ActivityField } from "@/entities/document";
import { SwMileage, SwMileageFile } from "@/entities/document";

type useGetActivityFieldRequest = void;

type useGetActivityFieldResponse = ActivityField;

type useApplySwMileageRequest = FormData;

type useApplySwMileageResponse = {
  swMileage: SwMileage;
  swMileageFiles: Array<SwMileageFile>;
};

type useGetSwMileageListRequest = {
  studentId?: string;
  status?: number;
};

type useGetSwMileageListResponse = Array<SwMileage>;

type useGetSwMileageDetailRequest = {
  swMileageId: number;
};

type useGetSwMileageDetailResponse = SwMileage;

export type {
  useGetActivityFieldRequest,
  useGetActivityFieldResponse,
  useApplySwMileageRequest,
  useApplySwMileageResponse,
  useGetSwMileageListRequest,
  useGetSwMileageListResponse,
  useGetSwMileageDetailRequest,
  useGetSwMileageDetailResponse,
};
