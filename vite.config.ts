import path from "path";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(() => {
	return {
		plugins: [react(), tailwindcss()],
		// only development
		// production 푸시 시 아래 server object 주석
		// shared/route.ts에서 baseURL 수정
		server: {
			proxy: {
				"/api": {
					target: "http://localhost:8080/api/v1/",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
		build: {
			// 번들 크기 경고 임계값 증가 (임시)
			chunkSizeWarningLimit: 1000,
			// 소스맵 비활성화 (프로덕션)
			sourcemap: false,
			// 미니파이 최적화 (esbuild가 더 빠름)
			minify: "esbuild" as const,
			// esbuild 옵션
			target: "es2020",
			rollupOptions: {
				// Tree shaking 최적화
				treeshake: "recommended" as const,
				output: {
					// 코드 스플리팅 및 청킹 최적화
					manualChunks: {
						// React 관련 라이브러리들
						"react-vendor": ["react", "react-dom", "react-router"],
						// UI 라이브러리들
						"ui-vendor": [
							"@radix-ui/react-alert-dialog",
							"@radix-ui/react-label",
							"@radix-ui/react-select",
							"@radix-ui/react-separator",
							"@radix-ui/react-slot",
							"lucide-react",
						],
						// 데이터 관리 라이브러리들
						"data-vendor": [
							"@tanstack/react-query",
							"@tanstack/react-table",
							"zustand",
						],
						// 블록체인 관련 라이브러리들
						"blockchain-vendor": ["@kaiachain/viem-ext", "viem"],
						// 폼 및 유틸리티 라이브러리들
						"utils-vendor": [
							"react-hook-form",
							"@hookform/resolvers",
							"zod",
							"dayjs",
							"ky",
							"clsx",
							"tailwind-merge",
							"class-variance-authority",
						],
					},
					// 파일명에 해시 추가로 캐싱 최적화
					entryFileNames: "assets/[name]-[hash].js",
					chunkFileNames: "assets/[name]-[hash].js",
					assetFileNames: "assets/[name]-[hash].[ext]",
				},
			},
		},
		optimizeDeps: {
			// 자주 사용되는 라이브러리들을 미리 번들링
			include: [
				"react",
				"react-dom",
				"react-router",
				"@tanstack/react-query",
				"@kaiachain/viem-ext",
				"viem",
				"zustand",
			],
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

		resolve: {
			alias: {
				"@": path.resolve("./src"),
				"@app": path.resolve("./src/app"),
				"@pages": path.resolve("./src/pages"),
				"@widgets": path.resolve("./src/widgets"),
				"@features": path.resolve("./src/features"),
				"@entities": path.resolve("./src/entities"),
				"@shared": path.resolve("./src/shared"),
			},
		},
	};
});
