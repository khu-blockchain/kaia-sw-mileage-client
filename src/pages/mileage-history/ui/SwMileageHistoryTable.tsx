import type { MileagePointHistory } from "@/shared/api";
import type { Row } from "@tanstack/react-table";
import type { MileageColumns } from "./columns";

import { useMemo } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate } from "react-router";

import { mileageQueries } from "@entities/mileage";
import { MILEAGE_POINT_HISTORY_TYPE } from "@/shared/api";
import { parseToFormattedDate } from "@/shared/lib";
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
				return acc - curr.mileage_point;
			}
			return acc + curr.mileage_point;
		}, 0);
	};

	const transformedData = useMemo(
		() =>
			data.map((mileage) => ({
				id: mileage.id,
				mileageCategoryName: mileage.mileage_category_name,
				mileageActivityName: mileage.mileage_activity_name,
				status: mileage.status,
				createdAt: parseToFormattedDate(mileage.created_at),
				mileagePoint: calculateMileagePoint(
					mileage.mileage_point_histories ?? [],
				),
				mileageTokenName:
					mileage.mileage_point_histories?.[0]?.mileage_token_name ?? "-",
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
