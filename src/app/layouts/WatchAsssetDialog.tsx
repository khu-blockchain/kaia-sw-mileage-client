import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

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
	Separator,
} from "@shared/ui";
import QRCode from "react-qr-code";

type WatchAsssetDialogProps = {
	name: string;
	symbol: string;
	decimals: number;
	address: string;
};

function WatchAsssetDialog({
	name,
	symbol,
	decimals,
	address,
}: WatchAsssetDialogProps) {
	const [open, setOpen] = useState(false);

	const { data: prepareResult } = useQuery({
		queryKey: ["prepare-watch-asset", name, symbol, decimals, address],
		queryFn: async () => {
			const result = await fetch(`https://api.kaiawallet.io/api/v1/k/prepare`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					chain_id: "1001",
					type: "watch_asset",
					bapp: {
						name: name,
						callback: {
							success: null,
							fail: null,
						},
					},
					watch_asset: {
						address: address,
						symbol: symbol,
						decimals: decimals,
						name: name,
					},
				}),
			});
			return result.json();
		},
	});

	console.log(prepareResult);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="ghost">
					<p className="text-body text-sm font-semibold">{`${name}`}</p>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>마일리지 토큰 등록</AlertDialogTitle>
					<AlertDialogDescription className="whitespace-pre-wrap text-sm break-keep">
						QR 코드를 스캔하여 마일리지 토큰을 내 Kaia Wallet에 등록할 수
						있습니다.
						<br />
						마일리지 토큰 등록 전 모바일 Kaia Wallet의 네트워크를 Kairos로
						변경해주세요.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<Separator />
				<div className="flex flex-col items-center justify-center">
				<QRCode
					size={150}
					style={{ height: "150px", width: "150px" }}
					value={`https://app.kaiawallet.io/a/${prepareResult?.request_key}`}
						viewBox={`0 0 150 150`}
					/>
				</div>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setOpen(false)}>
						닫기
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default WatchAsssetDialog;
