import type { MileageFileResponse, MileageResponse } from "@shared/api/mileage";
import type { Mileage, MileageFile } from "../model";

import { mapMileagePointHistory } from "@/entities/mileage-point-history";
import { mapStudent } from "@/entities/student/api/mapper";

export const mapMileage = (dto: MileageResponse): Mileage => {
	return {
		id: dto.id,
		mileageCategoryName: dto.mileage_category_name,
		mileageActivityName: dto.mileage_activity_name,
		mileageDescription: dto.mileage_description,
		adminComment: dto.admin_comment,
		docIndex: dto.doc_index,
		docHash: dto.doc_hash,
		status: dto.status,
		transactionStatus: dto.transaction_status,
		createdAt: new Date(dto.created_at),
		updatedAt: new Date(dto.updated_at),
		...(dto.student && { student: mapStudent(dto.student) }),
		...(dto.mileage_files && {
			mileageFiles: dto.mileage_files.map(mapMileageFile),
		}),
		...(dto.mileage_point_histories && {
			mileagePointHistories: dto.mileage_point_histories.map(
				mapMileagePointHistory,
			),
		}),
	};
};

export const mapMileageFile = (dto: MileageFileResponse): MileageFile => {
	return {
		id: dto.id,
		mileageId: dto.mileage_id,
		originalFileName: dto.original_file_name,
		storedFileName: dto.stored_file_name,
		url: dto.url,
		createdAt: new Date(dto.created_at),
		updatedAt: new Date(dto.updated_at),
	};
};
