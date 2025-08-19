import { useSuspenseQuery } from "@tanstack/react-query";
import { AlertCircle, Wallet } from "lucide-react";

import { studentQueries } from "@entities/student";
import { parseToFormattedDate } from "@shared/lib";
import { Button, Separator } from "@shared/ui";

import { walletLostQueries } from "../api";
import ConfirmChangeDialog from "./ConfirmChangeDialog";
import WalletChangeDialog from "./WalletChangeDialog";
import WalletLostDialog from "./WalletLostDialog";

export default function WalletInfo() {
	const { data: student } = useSuspenseQuery(studentQueries.getMe());
	const { data: walletChangeProcess } = useSuspenseQuery(
		walletLostQueries.getCheck(student.student_hash),
	);

	console.log(walletChangeProcess);

	return (
		<div className="content-container">
			<div className="flex items-center gap-2">
				<Wallet className="w-5 h-5" />
				<h2 className="text-lg font-semibold">계정 정보</h2>
			</div>

			<div className="grid gap-4">
				{!walletChangeProcess.data && (
					<>
						<div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
							<div className="flex flex-col gap-1">
								<p className="text-sm font-medium text-blue-900">
									SW 마일리지 계정
								</p>
								<p className="text-xs text-blue-700">
									연결된 계정 주소: {student.wallet_address}
								</p>
							</div>
							<div className="flex items-center gap-2">
								<WalletChangeDialog studentHash={student.student_hash}>
									<Button variant="link" className="text-xs text-blue-700">
										지갑 변경하기
									</Button>
								</WalletChangeDialog>
							</div>
						</div>
						<div className="flex items-center gap-1">
							<AlertCircle className="w-3.5 h-3.5 text-red-600" />
							<WalletLostDialog student={student}>
								연결된 Kaia 계정을 사용할 수 없나요?
							</WalletLostDialog>
						</div>
					</>
				)}
				{walletChangeProcess.result &&
					walletChangeProcess.data?.type === "WALLET_LOST" && (
						<div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
							<div className="flex flex-col w-full gap-1">
								<div className="flex w-full items-center justify-between mb-3">
									<p className="text-sm font-medium text-yellow-900">
										SW 마일리지 계정 변경이 요청되었습니다.
									</p>
									<p className="text-xs text-yellow-700">
										변경 요청 일시:{" "}
										{parseToFormattedDate(
											walletChangeProcess.data.data?.created_at ?? "",
										)}
									</p>
								</div>

								<p className="text-xs text-yellow-700">
									기존 계정:{" "}
									{walletChangeProcess.data.data?.previous_wallet_address}
								</p>
								<p className="text-xs text-yellow-700">
									변경 요청 계정:{" "}
									{walletChangeProcess.data.data?.request_wallet_address}
								</p>
							</div>
						</div>
					)}
				{walletChangeProcess.result &&
					walletChangeProcess.data?.type === "WALLET_CHANGE" && (
						<div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
							<div className="flex flex-col gap-1">
								<p className="text-sm font-medium text-yellow-900">
									SW 마일리지 계정 변경이 진행중입니다.
								</p>
								<p className="text-xs text-yellow-700">
									소유권 증명이 완료된 계정:{" "}
									{walletChangeProcess.data.data?.targetAccount}
								</p>
							</div>
							<div className="flex items-center gap-2">
								<ConfirmChangeDialog
									student={student}
									targetAccount={walletChangeProcess.data.data?.targetAccount}
								>
									<Button variant="link" className="text-xs text-yellow-700">
										지갑 변경 완료하기
									</Button>
								</ConfirmChangeDialog>
							</div>
						</div>
					)}
				<Separator />
				<div className="flex flex-col gap-2">
					<p className="text-sm font-medium text-body">주의사항</p>
					<ul className="text-xs text-muted-foreground space-y-1">
						<li>• 지갑 주소를 제외한 정보는 수정할 수 없습니다.</li>
						<li>
							• 지갑 주소 변경 시 <strong>소유권 증명</strong>,{" "}
							<strong>최종 변경 승인</strong> 과정을 거치게 됩니다.
						</li>
						<li>
							• 잘못된 정보 입력 시 마일리지 지급에 문제가 발생할 수 있습니다.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
