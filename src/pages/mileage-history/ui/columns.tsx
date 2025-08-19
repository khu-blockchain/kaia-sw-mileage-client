import { type ColumnDef } from "@tanstack/react-table";

import { MILEAGE_STATUS } from "@/shared/api";
import { cn } from "@/shared/lib/style";
import { mileageStatusParser } from "@entities/mileage";

export type MileageColumns = {
	id: number;
	mileageCategoryName: string;
	mileageActivityName: string;
	status: MILEAGE_STATUS;
	createdAt: string;
	mileagePoint: number;
  mileageTokenName: string;
};

const statusConfig = (status: MILEAGE_STATUS) => {
	const config = {
		[MILEAGE_STATUS.REVIEWING]: {
			text: mileageStatusParser(status).short_text,
			textColor: "text-pending",
		},
		[MILEAGE_STATUS.REJECTED]: {
			text: mileageStatusParser(status).short_text,
			textColor: "text-destructive",
		},
		[MILEAGE_STATUS.APPROVED]: {
			text: mileageStatusParser(status).short_text,
			textColor: "text-approved",
		},
	};

	return config[status];
};

export const columns: ColumnDef<MileageColumns>[] = [
  {
		accessorKey: "mileageCategoryName",
		header: "활동 분야",
	},
	{
		accessorKey: "mileageActivityName",
		header: "비교과 활동",
	},
	{
		accessorKey: "mileageTokenName",
		header: "지급된 토큰",
	},
  {
		accessorKey: "mileagePoint",
		header: "지급된 토큰 수량",
	},
	{
		accessorKey: "status",
		header: "상태",
		cell: ({ row }) => {
			return (
				<div
					className={cn(
						"inline-flex items-center text-sm font-medium",
						statusConfig(row.getValue("status")).textColor,
					)}
				>
					{statusConfig(row.getValue("status")).text}
				</div>
			);
		},
	},

	{
		accessorKey: "createdAt",
		header: "신청 날짜",
	},
];
