import { SwMileageToken } from "@/entities/token";

type useGetActiveSwMileageTokenRequest = void;

type useGetActiveSwMileageTokenResponse = SwMileageToken;

type useGetSWMileageTokenRequest = void;

type useGetSWMileageTokenResponse = SwMileageToken[];

type useGetMileagePointRequest = {
  targetAddress: string;
};

type useGetMileagePointResponse = string;


export type {
  useGetActiveSwMileageTokenRequest,
  useGetActiveSwMileageTokenResponse,
  useGetSWMileageTokenRequest,
  useGetSWMileageTokenResponse,
  useGetMileagePointRequest,
  useGetMileagePointResponse,
};
