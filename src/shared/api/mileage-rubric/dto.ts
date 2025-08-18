import type { POINT_TYPE } from "../enum";

type MileageCategoryResponse = {
	id: number;
	name: string;
	description: string;
};

type MileageActivityResponse = {
	id: number; 
	name: string;
	point_type: POINT_TYPE;
	point_description: string;
	fixed_point: number;
};

type MileageRubricResponse = MileageCategoryResponse & {
	mileage_activities: MileageActivityResponse[];
};

type GetRubricsResponse = MileageRubricResponse[];

export type {
	MileageCategoryResponse,
	MileageActivityResponse,
	MileageRubricResponse,
	GetRubricsResponse, 
};
