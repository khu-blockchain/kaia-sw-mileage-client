import type { Address } from "@kaiachain/viem-ext";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useStudentManager, useSwMileageToken } from "@features/kaia";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@shared/ui";

import { rankQueries } from "../api";

interface RankData {
	account: string;
	balance: bigint;
}

export default function RankTable() {
	const { call: callStudentManager } = useStudentManager();
	const { call: callSwMileageToken } = useSwMileageToken();
	const { data } = useSuspenseQuery({
		queryKey: rankQueries.list(),
		queryFn: async () => {
			const swMileageTokenAddress = (await callStudentManager(
				"mileageToken",
				[],
			)) as Address;

			const point = await callSwMileageToken(
				swMileageTokenAddress,
				"getRankingRange",
				[1, 20],
			);
			return point;
		},
	});

	const rankData = Array.isArray(data) ? (data as RankData[]) : [];

	if (!rankData || rankData.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-muted-foreground">랭킹 데이터가 없습니다.</p>
			</div>
		);
	}

	const sortedData = [...rankData].sort((a: RankData, b: RankData) => {
		return Number(b.balance - a.balance);
	});

	return (
		<div className="flex w-full">
			<div className="w-full rounded-md border overflow-auto">
				<Table className="border-collapse w-full">
					<TableHeader>
						<TableRow>
							<TableHead className="text-center text-muted-foreground">
								순위
							</TableHead>
							<TableHead className="text-center text-muted-foreground">
								계정 주소
							</TableHead>
							<TableHead className="text-center text-muted-foreground">
								마일리지
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedData.map((item, index) => (
							<TableRow key={item.account} className="hover:bg-gray-50">
								<TableCell className="text-center">
									<RankBadge rank={index + 1} />
								</TableCell>
								<TableCell className="text-center font-mono text-sm">
									{item.account}
								</TableCell>
								<TableCell className="text-center font-semibold">
									{item.balance.toString()}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

const RankBadge = ({ rank }: { rank: number }) => {
	const getRankStyle = () => {
		if (rank === 1) {
			return "bg-yellow-100 text-yellow-800 border-yellow-300";
		} else if (rank === 2) {
			return "bg-gray-100 text-gray-800 border-gray-300";
		} else if (rank === 3) {
			return "bg-orange-100 text-orange-800 border-orange-300";
		} else if (rank <= 10) {
			return "bg-blue-50 text-blue-700 border-blue-200";
		} else {
			return "bg-gray-50 text-gray-600 border-gray-200";
		}
	};

	const getRankIcon = () => {
		if (rank === 1) return "🥇";
		if (rank === 2) return "🥈";
		if (rank === 3) return "🥉";
		return "";
	};

	return (
		<div
			className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium ${getRankStyle()}`}
		>
			{getRankIcon() && <span>{getRankIcon()}</span>}
			<span>{rank}등</span>
		</div>
	);
};
