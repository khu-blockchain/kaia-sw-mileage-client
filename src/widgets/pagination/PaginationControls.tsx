import type { PaginationActions, PaginationInfo } from "./usePagination";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/shared/ui";

type PaginationControlsProps = {
	paginationInfo: PaginationInfo;
	paginationActions: PaginationActions;
	className?: string;
};
const PaginationControls = ({
	paginationInfo,
	paginationActions,
	className = "",
}: PaginationControlsProps) => {
	const { currentPage, totalPages, visiblePages, ellipsisInfo } =
		paginationInfo;

	const {
		goToPage,
		goToFirstPage,
		goToLastPage,
		goToPreviousPage,
		goToNextPage,
	} = paginationActions;

	// 페이지가 1개 이하면 페이지네이션을 표시하지 않음
	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className={`flex flex-col gap-4 ${className}`}>
			{/* 페이지네이션 컨트롤 */}
			<div className="flex justify-center">
				<Pagination>
					<PaginationContent>
						{/* 이전 페이지 */}
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={(e) => {
									e.preventDefault();
									goToPreviousPage();
								}}
							/>
						</PaginationItem>

						{/* 첫 번째 페이지 */}
						{ellipsisInfo.showFirstPage && (
							<>
								<PaginationItem>
									<PaginationLink
										href="#"
										onClick={(e) => {
											e.preventDefault();
											goToFirstPage();
										}}
									>
										1
									</PaginationLink>
								</PaginationItem>
								{ellipsisInfo.showStartEllipsis && (
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								)}
							</>
						)}

						{/* 현재 페이지 주변 페이지들 */}
						{visiblePages.map((pageNumber: number) => (
							<PaginationItem key={pageNumber}>
								<PaginationLink
									href="#"
									isActive={pageNumber === currentPage}
									onClick={(e) => {
										e.preventDefault();
										goToPage(pageNumber);
									}}
								>
									{pageNumber}
								</PaginationLink>
							</PaginationItem>
						))}

						{/* 마지막 페이지 */}
						{ellipsisInfo.showLastPage && (
							<>
								{ellipsisInfo.showEndEllipsis && (
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
								)}
								<PaginationItem>
									<PaginationLink
										href="#"
										onClick={(e) => {
											e.preventDefault();
											goToLastPage();
										}}
									>
										{totalPages}
									</PaginationLink>
								</PaginationItem>
							</>
						)}

						{/* 다음 페이지 */}
						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={(e) => {
									e.preventDefault();
									goToNextPage();
								}}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
};

export default PaginationControls;
