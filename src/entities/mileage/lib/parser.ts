import { MILEAGE_STATUS } from "@shared/api";

export const mileageStatusParser = (status: MILEAGE_STATUS) => {
	switch (status) {
		case MILEAGE_STATUS.REVIEWING:
			return {
				short_text: "심사 중",
				long_text: "심사 중입니다.",
			};
		case MILEAGE_STATUS.REJECTED:
			return {
				short_text: "반려",
				long_text: "마일리지가 반려되었습니다.",
			};
		case MILEAGE_STATUS.APPROVED:
			return {
				short_text: "승인",
				long_text: "마일리지가 승인되었습니다.",
			};
	}
};
