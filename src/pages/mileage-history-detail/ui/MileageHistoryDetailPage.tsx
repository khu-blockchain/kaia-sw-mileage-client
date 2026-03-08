import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";
import { Separator } from "@shared/ui";

import MileageHistoryDetail from "./MileageHistoryDetail";

export default function MileageHistoryDetailPage() {
	return (
		<PageBoundary>
			<PageLayout title="SW 마일리지 상세 정보">
				<div className="grid gap-4 w-full">
					<p className="text-sm text-muted-foreground whitespace-pre-wrap">
						선택하신 SW 마일리지 신청 건에 대한 상세 정보를 제공하는
						페이지입니다.
						<br />
						신청 시 입력했던 활동 내용 전체, 첨부 파일 정보, 그리고 사업단의
						심사 결과를 확인하실 수 있습니다.
					</p>
					<Separator />
					<div className="flex gap-4 w-full">
						<MileageHistoryDetail />
					</div>
				</div>
			</PageLayout>
		</PageBoundary>
	);
}
