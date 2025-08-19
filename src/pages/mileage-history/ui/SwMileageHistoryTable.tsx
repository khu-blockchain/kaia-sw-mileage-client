import type { MileagePointHistory } from "@entities/mileage-point-history";
import type { Row } from "@tanstack/react-table";
import type { MileageColumns } from "./columns";

import { useMemo } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate } from "react-router";

import { mileageQueries } from "@entities/mileage/api";
import { MILEAGE_POINT_HISTORY_TYPE } from "@/shared/api";
import { parseToFormattedDate } from "@/shared/lib/date.utils";
import { DataTable } from "@/shared/ui";

import { columns } from "./columns";

const SwMileageHistoryTable = () => {
	const navigate = useNavigate();
	const { data } = useSuspenseQuery(mileageQueries.getMyMileages());

	const calculateMileagePoint = (
		mileagePointHistories: MileagePointHistory[],
	) => {
		return mileagePointHistories?.reduce((acc, curr) => {
			if (curr.type === MILEAGE_POINT_HISTORY_TYPE.MILEAGE_BURNED) {
				return acc - curr.mileagePoint;
			}
			return acc + curr.mileagePoint;
		}, 0);
	};

	const transformedData = useMemo(
		() =>
			data.map((mileage) => ({
				id: mileage.id,
				mileageCategoryName: mileage.mileageCategoryName,
				mileageActivityName: mileage.mileageActivityName,
				status: mileage.status,
				createdAt: parseToFormattedDate(mileage.createdAt.toISOString()),
				mileagePoint: calculateMileagePoint(
					mileage.mileagePointHistories ?? [],
				),
				mileageTokenName:
					mileage.mileagePointHistories?.[0]?.mileageTokenName ?? "-",
			})),
		[data],
	);

	const onRowClick = (row: Row<MileageColumns>) => {
		navigate(`/history/${row.original.id}`);
	};

	const table = useReactTable({
		data: transformedData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
	});

	return (
		<div className="flex w-full">
			<DataTable table={table} onRowClick={onRowClick} />
		</div>
	);
};

export default SwMileageHistoryTable;
