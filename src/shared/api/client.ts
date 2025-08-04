import ky from "ky";
import { afterResponse, beforeRequest } from "./middleware";


// 순수한 HTTP 클라이언트 (비즈니스 로직 없음)
const apiClient = ky.create({
	timeout: 30000,
});

const authClient = ky.create({
	timeout: 30000,
	hooks: {
		beforeRequest: [beforeRequest],
		afterResponse: [afterResponse],
	},
});

export { apiClient, authClient };
