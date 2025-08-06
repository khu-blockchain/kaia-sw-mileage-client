import { BrowserRouter } from "react-router";
import { RecoilRoot } from "recoil";

import { RecoilProvider } from "@shared/lib/recoil";
import { Toaster } from "@shared/ui/sonner";

import { QueryProvider } from "./providers";
import { RootRouter } from "./routes";

function App() {
	return (
		<RecoilRoot>
			<RecoilProvider />
			<QueryProvider>
				<Toaster />
				<BrowserRouter>
					<RootRouter />
				</BrowserRouter>
			</QueryProvider>
		</RecoilRoot>
	);
}

export default App;
