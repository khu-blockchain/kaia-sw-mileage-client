import type { APIPromise } from "../types";
import type {
	GetMileageDetailRequest,
	GetMileageDetailResponse,
	GetMyMileageResponse,
	RegisterMileageRequest,
	RegisterMileageResponse,
} from "./dto";

import { MileageServer } from "../route";

export const mileageApi = {
	registerMileage: (
		request: RegisterMileageRequest,
	): APIPromise<RegisterMileageResponse> =>
		MileageServer.post("", {
			body: request,
		}).json(),

	getMyMileageHistory: (): APIPromise<GetMyMileageResponse> =>
		MileageServer.get("my").json(),

	getMyMileageDetail: (
		request: GetMileageDetailRequest,
	): APIPromise<GetMileageDetailResponse> =>
		MileageServer.get(`my/${request.id}`).json(),
};
