import { queryOptions } from "@tanstack/react-query";

import { mileageRubricApi } from "@shared/api/mileage-rubric";

import { mapMileageRubric } from "./mapper";

export const mileageRubricQueries = {
	all: () => ["mileage-rubric"] as const,

	getRubrics: () => [...mileageRubricQueries.all(), "rubrics"] as const,

	getRubric: () =>
		queryOptions({
			queryKey: [...mileageRubricQueries.getRubrics()],
			queryFn: async () => {
				const { data } = await mileageRubricApi.getRubrics();
				return data.map(mapMileageRubric);
			},
		}),
};
