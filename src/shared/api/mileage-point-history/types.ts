import type { MILEAGE_POINT_HISTORY_TYPE, TRANSACTION_STATUS } from "../enum";
import type { Mileage } from "../mileage";

type MileagePointHistory = {
	id: number;
	type: MILEAGE_POINT_HISTORY_TYPE;
	mileage_token_name: string;
	mileage_activity_name: string;
	mileage_category_name: string;
	mileage_point: number;
	transaction_hash: string;
	transaction_status: TRANSACTION_STATUS;
	note: string;
	mileage: Mileage;
	created_at: string;
	updated_at: string;
};

export type { MileagePointHistory };
