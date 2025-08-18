import { useState } from "react";

import { isAddress } from "@kaiachain/viem-ext";
import { toast } from "sonner";

import { STUDENT_MANAGER_ABI } from "@shared/config";
import { encodeContractExecutionABI, kaia, KaiaTxType } from "@shared/lib/web3";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Input,
	Separator,
} from "@shared/ui";

import { useCreateWalletChange } from "../api";

type WalletChangeDialogProps = {
	studentHash: string;
	children: React.ReactNode;
};

function WalletChangeDialog({ studentHash, children }: WalletChangeDialogProps) {
	const [open, setOpen] = useState(false);
	const [walletAddress, setWalletAddress] = useState("");

	const { mutateAsync } = useCreateWalletChange();

	const handleSubmit = async () => {
		if (!walletAddress) {
			toast.error("지갑 주소를 입력해주세요.");
			return;
		}
		if (!isAddress(walletAddress)) {
			toast.error("올바른 지갑 주소를 입력해주세요.");
			return;
		}

		const data = encodeContractExecutionABI(
			STUDENT_MANAGER_ABI,
			"proposeAccountChange",
			[walletAddress],
		);
		const rawTransaction = await kaia.wallet.signTransaction({
			type: KaiaTxType.FeeDelegatedSmartContractExecution,
			from: kaia.browserProvider.selectedAddress,
			to: import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
			data,
			gas: "0x4C4B40",
		});

		toast.promise(
			mutateAsync({
				studentHash,
				rawTransaction,
			}),
			{
				loading: "지갑 주소 변경 요청 중...",
				success: () => {
					setOpen(false);
					return {
						message: "지갑 주소 변경 요청이 완료되었습니다.",
						description: "블록체인에 기록되는데까지 시간이 소요될 수 있습니다.",
					};
				},
				error: "지갑 주소 변경 요청에 실패했습니다.",
			},
		);
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<span className="text-sm text-slate-600 hover:underline cursor-pointer">
					{children}
				</span>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>지갑 주소 변경</AlertDialogTitle>
					<AlertDialogDescription className="whitespace-pre-wrap text-sm break-keep">
						연결된 Kaia 계정을 변경할 수 있습니다.
						<br />
						먼저, 변경하고자 하는 계정에 대한 소유권 증명이 완료되어야 합니다.
						<br />
						아래의 절차를 따라서 진행해주세요.
						<br />
						<br />
						<strong className="text-muted-foreground">
							1. 변경하고자 하는 계정의 주소를 입력해주세요.
						</strong>
						<br />
						<strong className="text-muted-foreground">
							2. 기존에 사용하던 계정으로 지갑을 연결해주세요.
						</strong>
						<br />
						<strong className="text-muted-foreground">
							3. 확인 버튼을 눌러 소유권 증명을 요청을 진행해주세요.
						</strong>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Separator />
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<span className="text-sm text-muted-foreground">Kaia 계정</span>
						<Input
							value={walletAddress}
							onChange={(e) => setWalletAddress(e.target.value)}
							placeholder="변경하고자 하는 계정의 주소를 입력해주세요."
						/>
					</div>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setOpen(false)}>
						취소
					</AlertDialogCancel>
					<Button onClick={() => handleSubmit()}>확인</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default WalletChangeDialog;
