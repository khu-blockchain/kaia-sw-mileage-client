import { Mutation, SuspenseQuery } from "@/features/_core/api";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  useApplySwMileageRequest,
  useApplySwMileageResponse,
  useGetActivityFieldRequest,
  useGetActivityFieldResponse,
  useGetSwMileageDetailRequest,
  useGetSwMileageDetailResponse,
  useGetSwMileageListRequest,
  useGetSwMileageListResponse,
} from "./type";
import {
  applySwMileageAPI,
  getActivityFieldAPI,
  getSwMileageDetailAPI,
  getSwMileageListAPI,
} from "../api";

const useGetActivityField: SuspenseQuery<
  useGetActivityFieldRequest,
  useGetActivityFieldResponse
> = (args) => {
  return useSuspenseQuery({
    queryKey: ["get-activity-field"],
    queryFn: async () => {
      const result = await getActivityFieldAPI(args);
      return result;
    },
  });
};

const useApplySwMileage: Mutation<
  useApplySwMileageRequest,
  useApplySwMileageResponse
> = (args) => {
  const { onSuccess, onError } = args;
  return useMutation({
    mutationFn: async (data) => {
      return await applySwMileageAPI(data);
    },
    ...(onSuccess && { onSuccess: (res: any) => onSuccess(res) }),
    ...(onError && { onError: (res) => onError(res) }),
  });
};

const useGetSwMileageList: SuspenseQuery<
  useGetSwMileageListRequest,
  useGetSwMileageListResponse
> = (args) => {
  return useSuspenseQuery({
    queryKey: ["get-sw-mileage-list"],
    queryFn: async () => {
      const result = await getSwMileageListAPI(args);
      return result;
    },
  });
};

const useGetSwMileageDetail: SuspenseQuery<
  useGetSwMileageDetailRequest,
  useGetSwMileageDetailResponse
> = (args) => {
  return useSuspenseQuery({
    queryKey: ["get-sw-mileage-detail", args.swMileageId],
    queryFn: async () => {
      const result = await getSwMileageDetailAPI(args);
      return result;
    },
    staleTime: 0,
  });
};

export {
  useGetActivityField,
  useApplySwMileage,
  useGetSwMileageList,
  useGetSwMileageDetail,
};
