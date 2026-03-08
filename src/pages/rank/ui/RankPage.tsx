import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";
import { Separator } from "@/shared/ui";

import RankTable from "./RankTable";

export default function RankPage() {
	return (
		<PageBoundary>
			<PageLayout title="랭킹">
				<div className="grid gap-4 w-full">
					<p className="text-sm text-muted-foreground whitespace-pre-wrap">
						SW 마일리지 보유량 기준 전체 학생 랭킹을 확인하는 페이지입니다.
						<br />
						상위 20명의 학생들의 마일리지 현황을 확인할 수 있습니다.
					</p>
					<Separator />
					<div className="flex gap-4 w-full">
						<RankTable />
					</div>
				</div>
			</PageLayout>
		</PageBoundary>
	);
}
