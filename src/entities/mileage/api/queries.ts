import { mileageApi } from "@/shared/api";

export const mileageQueries = {
	all: () => ["mileage"] as const,
	myMileages: () => [...mileageQueries.all(), "my"] as const,
	myMileageDetail: (id: number) =>
		[...mileageQueries.myMileages(), "detail", id] as const,
	getMyMileages: () => ({
		queryKey: mileageQueries.myMileages(),
		queryFn: async () => {
			const { data } = await mileageApi.getMyMileageHistory();
			return data;
		},
	}),
	getMyMileageDetail: (id: number) => ({
		queryKey: mileageQueries.myMileageDetail(id),
		queryFn: async () => {
			const { data } = await mileageApi.getMyMileageDetail({ id });
			return data;
		},
	}),
};
