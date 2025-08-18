import { studentApi } from "@/shared/api/student";
import { mapStudent } from "./mapper";

export const studentQueries = {
	all: () => ["student"] as const,
	me: () => [...studentQueries.all(), "me"] as const,
	getMe: () => ({
		queryKey: studentQueries.me(),
		queryFn: async () => {
			const { data } = await studentApi.getMe();
			return mapStudent(data);
		},
	}),
};
