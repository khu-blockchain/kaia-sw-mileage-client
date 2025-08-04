import path from "path";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// 환경 변수 타입 정의
declare global {
	const __ENV__: {
		VITE_STUDENT_MANAGER_CONTRACT_ADDRESS: string;
		VITE_SW_MILEAGE_TOKEN_FACTORY_ADDRESS: string;
		VITE_NETWORK_RPC_URL: string;
		VITE_API_URL: string;
		VITE_KAIROS_NETWORK_ID: string;
		NODE_ENV: string;
	};
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// 현재 디렉토리 경로
	const currentDir = process.cwd();

	// 환경별 env 파일 경로 설정
	const envDir =
		mode === "production"
			? "/etc/sw-mileage/env" // 프로덕션: 시스템 경로
			: currentDir; // 개발: 프로젝트 루트

	// 환경 변수 로드
	const env = loadEnv(mode, envDir, "");

	return {
		plugins: [react(), tailwindcss()],
		optimizeDeps: {
			esbuildOptions: {
				// Node.js 글로벌 polyfill
				define: {
					global: "globalThis",
				},
				plugins: [
					NodeGlobalsPolyfillPlugin({
						buffer: true,
						process: true,
					}),
					NodeModulesPolyfillPlugin(),
				],
			},
		},
		envDir,
		define: {
			// 런타임에서 사용할 환경 변수들을 명시적으로 정의
			__ENV__: {
				VITE_STUDENT_MANAGER_CONTRACT_ADDRESS: JSON.stringify(
					env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
				),
				VITE_SW_MILEAGE_TOKEN_FACTORY_ADDRESS: JSON.stringify(
					env.VITE_SW_MILEAGE_TOKEN_FACTORY_ADDRESS,
				),
				VITE_NETWORK_RPC_URL: JSON.stringify(env.VITE_NETWORK_RPC_URL),
				VITE_API_URL: JSON.stringify(env.VITE_API_URL),
				VITE_KAIROS_NETWORK_ID: JSON.stringify(
					env.VITE_KAIROS_NETWORK_ID,
				),
				NODE_ENV: JSON.stringify(mode),
			},
		},
		resolve: {
			alias: {
				"@": path.resolve(currentDir, "./src"),
				"@app": path.resolve(currentDir, "./src/app"),
				"@pages": path.resolve(currentDir, "./src/pages"),
				"@widgets": path.resolve(currentDir, "./src/widgets"),
				"@features": path.resolve(currentDir, "./src/features"),
				"@entities": path.resolve(currentDir, "./src/entities"),
				"@shared": path.resolve(currentDir, "./src/shared"),
			},
		},
	};
});
