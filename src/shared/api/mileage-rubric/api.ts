import type { APIPromise } from "../types";
import type {
	GetRubricsResponse,
} from "./dto";

import { MileageRubricServer } from "../route";

export const mileageRubricApi = {
	getRubrics: (): APIPromise<GetRubricsResponse> =>
		MileageRubricServer.get("").json(),
};
