import type {
	MILEAGE_POINT_HISTORY_TYPE,
	TRANSACTION_STATUS,
} from "@shared/api/enum";

export interface MileagePointHistory {
	id: number;
	type: MILEAGE_POINT_HISTORY_TYPE;
	mileageTokenName: string;
	mileageActivityName: string;
	mileageCategoryName: string;
	mileagePoint: number;
	transactionHash: string;
	transactionStatus: TRANSACTION_STATUS;
	note: string;
	createdAt: Date;
	updatedAt: Date;
}
