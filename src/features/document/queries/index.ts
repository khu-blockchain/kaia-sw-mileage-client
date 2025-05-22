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
import { useMemo } from "react";
import { sliceWalletAddress, parseToFormattedDate } from "@/shared/utils";
import { ACTIVITY_CATEGORIES } from "@/shared/constants";

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
    queryKey: ["get-sw-mileage-detail"],
    queryFn: async () => {
      const result = await getSwMileageDetailAPI(args);
      return result;
    },
  });
};

export {
  useGetActivityField,
  useApplySwMileage,
  useGetSwMileageList,
  useGetSwMileageDetail,
};
