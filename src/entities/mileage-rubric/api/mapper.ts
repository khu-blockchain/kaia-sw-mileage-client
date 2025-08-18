import type {
	MileageActivityResponse,
	MileageCategoryResponse,
	MileageRubricResponse,
} from "@shared/api/mileage-rubric";
import type { MileageActivity, MileageCategory, MileageRubric } from "../model";

import { POINT_TYPE } from "@shared/api";

const mapMileageCategory = (dto: MileageCategoryResponse): MileageCategory => {
	return {
		id: dto.id,
		name: dto.name,
		description: dto.description,
	};
};

const mapMileageActivity = (dto: MileageActivityResponse): MileageActivity => {
	return {
		id: dto.id,
		name: dto.name,
		pointType: dto.point_type,
		pointDescription: dto.point_description,
		fixedPoint: dto.fixed_point,
	};
};

const mapMileageRubric = (dto: MileageRubricResponse): MileageRubric => {
	return {
		...mapMileageCategory(dto),
		mileageActivities: dto.mileage_activities.map(mapMileageActivity),
	};
};

const mapMileageActivityPointType = (pointType: POINT_TYPE): string => {
	return pointType === POINT_TYPE.FIXED ? "고정 배점" : "별도 책정";
};

export {
	mapMileageCategory,
	mapMileageActivity,
	mapMileageRubric,
	mapMileageActivityPointType,
};
