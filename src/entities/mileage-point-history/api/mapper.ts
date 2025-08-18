import type { MileagePointHistoryResponse } from "@shared/api/mileage-point-history";
import type { MileagePointHistory } from "../model";

export const mapMileagePointHistory = (
	dto: MileagePointHistoryResponse,
): MileagePointHistory => {
	return {
		id: dto.id,
		type: dto.type,
		mileageTokenName: dto.mileage_token_name,
		mileageActivityName: dto.mileage_activity_name,
		mileageCategoryName: dto.mileage_category_name,
		mileagePoint: dto.mileage_point,
		transactionHash: dto.transaction_hash,
		note: dto.note,
		transactionStatus: dto.transaction_status,
		createdAt: new Date(dto.created_at),
		updatedAt: new Date(dto.updated_at),
	};
};
