import type { POINT_TYPE } from "../enum";

type MileageCategory = {
	id: number;
	name: string;
	description: string;
};

type MileageActivity = {
	id: number;
	name: string;
	point_type: POINT_TYPE;
	point_description: string;
	fixed_point: number;
};

type MileageRubric = MileageCategory & {
	mileage_activities: MileageActivity[];
};

export type { MileageCategory, MileageActivity, MileageRubric };
