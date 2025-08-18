import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";
import { Separator } from "@/shared/ui";
import SwMileageHistoryTable from "./SwMileageHistoryTable";

export default function MileageHistoryPage() {
	return (
		<PageBoundary>
			<PageLayout title="SW 마일리지 신청 내역">
				<div className="grid gap-4 w-full">
					<p className="text-sm text-muted-foreground whitespace-pre-wrap">
						제출하신 SW 마일리지 신청 건들의 처리 상태를 확인하는 페이지입니다.
						<br />
						신청 일자, 활동 내용 요약, 현재 심사 상태 등을 한눈에 파악하실 수
						있습니다. 상세 내역 확인을 원하시면 해당 신청 건을 선택하세요.
					</p>
					<Separator />
					<div className="flex gap-4 w-full">
						<SwMileageHistoryTable />
					</div>
				</div>
			</PageLayout>
		</PageBoundary>
	);
}
