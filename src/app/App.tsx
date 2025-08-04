import { BrowserRouter } from "react-router";

import { Toaster } from "@shared/ui/sonner";

import { QueryProvider } from "./providers";
import { RootRouter } from "./routes";

function App() {
	return (
		<QueryProvider>
			<Toaster />
			<BrowserRouter>
				<RootRouter />
			</BrowserRouter>
		</QueryProvider>
	);
}

export default App;
