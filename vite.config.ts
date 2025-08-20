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
