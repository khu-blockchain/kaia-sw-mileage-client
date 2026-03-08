import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";
import { useKaiaWallet } from "@features/kaia";
import { Separator } from "@shared/ui";

import StudentProfile from "./StudentProfile";
import WalletInfo from "./WalletInfo";

export default function UserSettingPage() {
	const { connectKaiaWallet } = useKaiaWallet();
	connectKaiaWallet();
	return (
		<PageBoundary>
			<PageLayout title="내 정보">
				<div className="grid gap-4 w-full">
					<p className="text-sm text-muted-foreground whitespace-pre-wrap">
						개인정보 및 연결된 지갑 정보를 확인할 수 있습니다.
						<br />
						연결된 지갑 주소를 변경하고 싶다면 "지갑 변경하기"를 클릭해주세요.
					</p>
					<Separator />
					<div className="flex flex-col gap-4 w-full">
						<WalletInfo />
						<StudentProfile />
					</div>
				</div>
			</PageLayout>
		</PageBoundary>
	);
}
