import type { Mileage } from "./types";

type RegisterMileageRequest = FormData;

type RegisterMileageResponse = {
	success: boolean;
};

type GetMyMileageResponse = Mileage[];

type GetMileageDetailRequest = {
	id: number;
};

type GetMileageDetailResponse = Mileage;

export type {
	RegisterMileageRequest,
	RegisterMileageResponse,
	GetMyMileageResponse,
	GetMileageDetailRequest,
	GetMileageDetailResponse,
};
