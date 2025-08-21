import { useMutation } from "@tanstack/react-query";

import { authApi } from "@shared/api";
import { useAuthStore } from "@shared/authorize";

export const useLogout = () => {
	const { reset } = useAuthStore();
	return useMutation({
		mutationFn: async () => {
			await authApi.logout();
			reset();
			window.location.reload();
		},
	});
};
