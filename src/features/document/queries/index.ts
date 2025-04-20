import { Mutation, SuspenseQuery } from "@/features/_core/api";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  useApplySwMileageRequest,
  useApplySwMileageResponse,
  useGetActivityFieldRequest,
  useGetActivityFieldResponse,
} from "./type";
import { applySwMileageAPI, getActivityFieldAPI } from "../api";

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

export { useGetActivityField, useApplySwMileage };
