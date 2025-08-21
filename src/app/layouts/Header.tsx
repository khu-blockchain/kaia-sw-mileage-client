import type { Address } from "@kaiachain/viem-ext";

import { useQuery } from "@tanstack/react-query";
import { Bolt, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

import {
	KaiaButton,
	useKaiaAccount,
	useKaiaWallet,
	useStudentManager,
	useSwMileageToken,
} from "@features/kaia";
import { KaiaIcon } from "@shared/assets";
import { cn } from "@shared/lib/style";
import { sliceWalletAddress } from "@shared/lib/web3";

import { MENU } from "./configuration";
import { Button } from "@shared/ui";
import { useLogout } from "./api";

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { currentAccount } = useKaiaAccount();
	const { connectKaiaWallet } = useKaiaWallet();

	const { mutate } = useLogout();

	return (
		<header className="fixed top-0 left-0 z-50 w-full h-16 flex items-center px-8 bg-white border-b border-slate-20">
			<div className="flex w-7xl max-w-7xl mx-auto justify-between items-center gap-8">
				<div className="flex gap-10 items-center ">
					<img
						src="https://swedu.khu.ac.kr/images/logo_swedu.png"
						alt="logo"
						onClick={() => navigate("/")}
						className="h-8 object-contain cursor-pointer"
					/>
					<div className="flex gap-4">
						{MENU.map((menu) => (
							<p
								key={menu.path}
								className={cn(
									"text-body text-sm font-semibold cursor-pointer",
									location.pathname.includes(menu.path) && "text-index",
								)}
								onClick={() => navigate(menu.path)}
							>
								{menu.name}
							</p>
						))}
					</div>
				</div>
				<div className="flex gap-4 items-center">
					<MyPoint />
					{!currentAccount ? (
						<KaiaButton.SmallButton onClick={() => connectKaiaWallet()} />
					) : (
						<div className="flex flex-row items-center h-8 gap-1 border border-kaia rounded-full py-1 pl-1 pr-2">
							<img src={KaiaIcon} alt="logo" className="w-6" />
							<span className="text-xs text-kaia font-bold">
								{sliceWalletAddress(currentAccount)}
							</span>
						</div>
					)}
					<Button variant="ghost" size="icon" onClick={() => mutate()}>
						<LogOut className="w-5 h-5 text-body" />
					</Button>
				</div>
			</div>
		</header>
	);
};

const MyPoint = () => {
	const { currentAccount } = useKaiaAccount();
	const { call: callStudentManager } = useStudentManager();
	const { call: callSwMileageToken } = useSwMileageToken();
	const { data: { point, name } = { point: 0, name: "-" } } = useQuery({
		queryKey: ["my-point", currentAccount],
		queryFn: async () => {
			if (!currentAccount) {
				return {
					point: 0,
					name: "-",
				};
			}

			const swMileageTokenAddress = (await callStudentManager(
				"mileageToken",
				[],
			)) as Address;

			const point = await callSwMileageToken(
				swMileageTokenAddress,
				"balanceOf",
				[currentAccount],
			);

			const name = await callSwMileageToken(swMileageTokenAddress, "name", []);

			//TODO: point 있을 때 wei 처리해야하는지 확인
			return {
				point,
				name,
			};
		},
	});

	return (
		<div className="flex gap-1 items-center">
			{currentAccount && (
				<>
					<p className="text-body text-sm font-semibold">{`${name}`}</p>
					<Bolt className="w-5 h-5 text-body" />
					<p className="text-body text-sm font-semibold">{`${point}점`}</p>
				</>
			)}
			{!currentAccount && (
				<p className="text-body text-[10px] font-semibold">
					지갑을 연결하면 마일리지 토큰과 보유량이 표시됩니다.
				</p>
			)}
		</div>
	);
};

export default Header;
