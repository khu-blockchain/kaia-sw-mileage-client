import type { POINT_TYPE } from "@shared/api/enum";

type MileageCategory = {
	id: number;
	name: string;
	description: string;
};

type MileageActivity = {
	id: number;
	name: string;
	pointType: POINT_TYPE;
	pointDescription: string;
	fixedPoint: number;
};

type MileageRubric = MileageCategory & {
	mileageActivities: MileageActivity[];
};

export type { MileageCategory, MileageActivity, MileageRubric };
