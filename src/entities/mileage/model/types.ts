import type { MILEAGE_STATUS, TRANSACTION_STATUS } from "@/shared/api";
import type { MileagePointHistory } from "@entities/mileage-point-history";
import type { Student } from "@entities/student";

export interface Mileage {
	id: number;
	mileageCategoryName: string;
	mileageActivityName: string;
	mileageDescription: string;
	adminComment: string | null;
	docIndex: number | null;
	docHash: string | null;
	status: MILEAGE_STATUS;
	transactionStatus: TRANSACTION_STATUS;
	createdAt: Date;
	updatedAt: Date;
	student?: Student;
	mileageFiles?: MileageFile[];
	mileagePointHistories?: MileagePointHistory[];
}

export interface MileageFile {
	id: number;
	mileageId: number;
	originalFileName: string;
	storedFileName: string;
	url: string;
	createdAt: Date;
	updatedAt: Date;
}
