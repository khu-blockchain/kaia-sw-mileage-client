import { MILEAGE_POINT_HISTORY_TYPE } from "@shared/api";

export const mileagePointAmountParser = (
	type: MILEAGE_POINT_HISTORY_TYPE,
	amount: number,
) => {
	switch (type) {
		case MILEAGE_POINT_HISTORY_TYPE.MILEAGE_APPROVED:
		case MILEAGE_POINT_HISTORY_TYPE.MILEAGE_MINTED:
			return `+${amount.toLocaleString()}`;
		case MILEAGE_POINT_HISTORY_TYPE.MILEAGE_BURNED:
			return `-${amount.toLocaleString()}`;
	}
};

export const mileageHistoryTypeParser = (type: MILEAGE_POINT_HISTORY_TYPE) => {
	switch (type) {
		case MILEAGE_POINT_HISTORY_TYPE.MILEAGE_APPROVED:
			return "마일리지 승인";
		case MILEAGE_POINT_HISTORY_TYPE.MILEAGE_MINTED:
			return "추가 지급";
		case MILEAGE_POINT_HISTORY_TYPE.MILEAGE_BURNED:
			return "회수";
	}
};
