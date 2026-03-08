import type { Table as ReactTable, Row } from "@tanstack/react-table";

import { flexRender } from "@tanstack/react-table";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";

interface DataTableProps<TData> {
	table: ReactTable<TData>;
	onRowClick?: (row: Row<TData>) => void;
}

export function DataTable<TData>({ table, onRowClick }: DataTableProps<TData>) {
	return (
		<div className="w-full">
			<div className="overflow-hidden rounded-md border bg-white">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									onClick={() => onRowClick && onRowClick(row)}
									className={
										onRowClick ? "cursor-pointer hover:bg-gray-100" : undefined
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="whitespace-pre-line break-keep"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={table.getAllColumns().length}
									className="h-24 text-center"
								>
									결과가 없습니다.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{table.getPageCount() > 1 && (
				<div className="flex items-center justify-end space-x-2 py-4">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href="#"
									onClick={(e) => {
										e.preventDefault();
										table.previousPage();
									}}
									className={
										!table.getCanPreviousPage()
											? "pointer-events-none opacity-50"
											: ""
									}
								/>
							</PaginationItem>

							{Array.from({ length: table.getPageCount() }, (_, i) => {
								const pageNumber = i + 1;
								const currentPage = table.getState().pagination.pageIndex + 1;

								return (
									<PaginationItem key={pageNumber}>
										<PaginationLink
											href="#"
											isActive={pageNumber === currentPage}
											onClick={(e) => {
												e.preventDefault();
												table.setPageIndex(i);
											}}
										>
											{pageNumber}
										</PaginationLink>
									</PaginationItem>
								);
							})}

							<PaginationItem>
								<PaginationNext
									href="#"
									onClick={(e) => {
										e.preventDefault();
										table.nextPage();
									}}
									className={
										!table.getCanNextPage()
											? "pointer-events-none opacity-50"
											: ""
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</div>
	);
}
