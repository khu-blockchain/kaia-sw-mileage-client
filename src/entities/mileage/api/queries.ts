import { mileageApi } from "@/shared/api/mileage";

import { mapMileage } from "./mapper";

export const mileageQueries = {
	all: () => ["mileage"] as const,
	myMileages: () => [...mileageQueries.all(), "my"] as const,
	myMileageDetail: (id: number) =>
		[...mileageQueries.myMileages(), "detail", id] as const,
	getMyMileages: () => ({
		queryKey: mileageQueries.myMileages(),
		queryFn: async () => {
			const { data } = await mileageApi.getMyMileageHistory();
			return data.map(mapMileage);
		},
	}),
	getMyMileageDetail: (id: number) => ({
		queryKey: mileageQueries.myMileageDetail(id),
		queryFn: async () => {
			const { data } = await mileageApi.getMyMileageDetail({ id });
			return mapMileage(data);
		},
	}),
};
