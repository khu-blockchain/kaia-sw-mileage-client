import type { MILEAGE_STATUS, TRANSACTION_STATUS } from "../enum";
import type { MileagePointHistoryResponse } from "../mileage-point-history";
import type { StudentResponse } from "../student";

type MileageResponse = {
	id: number;
	mileage_category_name: string;
	mileage_activity_name: string;
	mileage_description: string;
	admin_comment: string | null;
	doc_index: number | null;
	doc_hash: string | null;
	status: MILEAGE_STATUS;
	transaction_status: TRANSACTION_STATUS;
	created_at: Date;
	updated_at: Date;
	student?: StudentResponse;
	mileage_files?: MileageFileResponse[];
	mileage_point_histories?: MileagePointHistoryResponse[];
};

type MileageFileResponse = {
	id: number;
	mileage_id: number;
	original_file_name: string;
	stored_file_name: string;
	url: string;
	created_at: Date;
	updated_at: Date;
};

type RegisterMileageRequest = FormData;

type RegisterMileageResponse = {
	success: boolean;
};

type GetMyMileageResponse = MileageResponse[];

type GetMileageDetailRequest = {
	id: number;
};

type GetMileageDetailResponse = MileageResponse;

export type {
	MileageResponse,
	MileageFileResponse,
	RegisterMileageRequest,
	RegisterMileageResponse,
	GetMyMileageResponse,
	GetMileageDetailRequest,
	GetMileageDetailResponse,
};
