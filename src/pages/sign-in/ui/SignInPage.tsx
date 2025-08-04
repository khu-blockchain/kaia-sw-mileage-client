import { SignBackground } from "@/shared/assets";

import SignInForm from "./SignInForm";

export default function SignInPage() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col p-6">
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm">
						<SignInForm />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<img
					src={SignBackground}
					alt="Image"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
