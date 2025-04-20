import { SwMileageToken } from "@/entities/token";

type getActiveSwMileageTokenAPIRequest = void;

type getActiveSwMileageTokenAPIResponse = SwMileageToken;

type getSWMileageTokenAPIRequest = void;

type getSWMileageTokenAPIResponse = SwMileageToken[];

export type {
  getActiveSwMileageTokenAPIRequest,
  getActiveSwMileageTokenAPIResponse,
  getSWMileageTokenAPIRequest,
  getSWMileageTokenAPIResponse,
};
