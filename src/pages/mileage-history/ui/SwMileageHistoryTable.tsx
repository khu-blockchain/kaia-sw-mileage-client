import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { type Mileage } from "@entities/mileage";
import { mileageQueries } from "@entities/mileage/api";
import { MILEAGE_STATUS } from "@/shared/api";
import { parseToFormattedDate } from "@/shared/lib/date.utils";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/shared/ui";

const SwMileageHistoryTable = () => {
	const navigate = useNavigate();
	const { data: myMileage } = useSuspenseQuery(mileageQueries.getMyMileages());

	console.log(myMileage);
	const historyTableMapper = (data: Mileage[]) =>
		data.map((history) => {
			return {
				id: history.id,
				mileageCategoryName: history.mileageCategoryName,
				mileageActivityName: history.mileageActivityName,
				createdAt: history.createdAt,
				status: history.status,
			};
		});

	return (
		<div className="flex w-full">
			<div className="w-full rounded-md border overflow-auto">
				<Table className="border-collapse w-full">
					<TableHeader>
						<TableRow>
							<TableHead className="text-center text-muted-foreground">
								학술 분야
							</TableHead>
							<TableHead className="text-center text-muted-foreground">
								비교과 활동
							</TableHead>
							<TableHead className="text-center text-muted-foreground">
								신청일
							</TableHead>
							<TableHead className="text-center text-muted-foreground">
								상태
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{historyTableMapper(myMileage).map((history) => (
							<TableRow
								className="hover:cursor-pointer hover:bg-gray-50"
								key={history.id}
								onClick={() => {
									navigate(`/history/${history.id}`);
								}}
							>
								<TableCell className="text-center">
									{history.mileageCategoryName}
								</TableCell>
								<TableCell className="text-center">
									{history.mileageActivityName}
								</TableCell>
								<TableCell className="text-center">
									{parseToFormattedDate(history.createdAt.toISOString())}
								</TableCell>
								<TableCell className="text-center">
									<SwMileageStatusBadge status={history.status} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default SwMileageHistoryTable;

const SwMileageStatusBadge = ({ status }: { status: MILEAGE_STATUS }) => {
	const statusText = {
		[MILEAGE_STATUS.REVIEWING]: {
			text: "심사중",
			color: "text-pending",
		},
		[MILEAGE_STATUS.APPROVED]: {
			text: "승인",
			color: "text-approved",
		},
		[MILEAGE_STATUS.REJECTED]: {
			text: "반려",
			color: "text-destructive",
		},
	};
	return (
		<p className={`${statusText[status].color}`}>{statusText[status].text}</p>
	);
};
