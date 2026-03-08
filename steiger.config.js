import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
	...fsd.configs.recommended,
	{
		files: ["./src/shared/api/**"],
		rules: {
			"fsd/no-public-api-sidestep": "off",
      // api 하위 레이어에서 도메인 이름을 명시하는것이 좋다고 생각하여 비활성화
		},
	},
]);
