import type { MileageResponse } from "@shared/api/mileage";
import type { MILEAGE_POINT_HISTORY_TYPE, TRANSACTION_STATUS } from "../enum";

type MileagePointHistoryResponse = {
	id: number;
	type: MILEAGE_POINT_HISTORY_TYPE;
	mileage_token_name: string;
	mileage_activity_name: string;
	mileage_category_name: string;
	mileage_point: number;
	transaction_hash: string;
	transaction_status: TRANSACTION_STATUS;
	note: string;
	mileage: MileageResponse;
	created_at: Date;
	updated_at: Date;
};

export type {
	MileagePointHistoryResponse,
};
