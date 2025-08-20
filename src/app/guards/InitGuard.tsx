import { useEffect } from "react";

import { Outlet } from "react-router";
import { toast } from "sonner";

import { KAIROS_NETWORK_ID, useKaiaWallet } from "@features/kaia";

export default function InitGuard() {
	const { isInstalled, currentNetwork, switchToKairosNetwork } =
		useKaiaWallet();
	useEffect(() => {
		if (!isInstalled) {
			toast.error("Kaia Wallet이 설치되지 않았습니다.", {
				description: () => (
					<div className="flex flex-col leading-relaxed">
						<span>
							<a
								href="https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 underline"
							>
								여기
							</a>
							를 클릭하여 Kaia Wallet을 설치해주세요.
						</span>
						<span>설치가 완료되면 브라우저를 새로고침 해주세요.</span>
					</div>
				),
				position: "top-center",
				duration: 1000000,
			});
		}
	}, [isInstalled]);

	useEffect(() => {
		if (currentNetwork !== KAIROS_NETWORK_ID && currentNetwork !== "loading") {
			toast.error("Kairos Network에 연결되지 않았습니다.", {
				description: () => {
					return (
						<span>
							<button
								className="text-index underline"
								onClick={async () => {
									await switchToKairosNetwork();
									window.location.reload();
								}}
							>
								Kairos Network에 연결하기
							</button>
						</span>
					);
				},
				position: "top-center",
				duration: 1000000,
			});
		}
	}, [currentNetwork, switchToKairosNetwork]);
	//로그인이 완료된 사용자는 진입 할 수 없음.
	//TODO: 의도한대로 동작하지 않음
	// const { getStudent } = useStudentStore((state) => state.actions);
	// if (getStudent().student_id !== "") {
	//   return <Navigate to={"/"} />;
	// }
	return <Outlet />;
}
