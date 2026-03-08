import { useSuspenseQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { toast } from "sonner";

import { PageBoundary } from "@widgets/page-boundary";
import { PageLayout } from "@widgets/page-layout";
import {
	ContractEnum,
	STUDENT_MANAGER_CONTRACT_ADDRESS,
	useKaiaContract,
	useKaiaWallet,
} from "@features/kaia";
import { Separator } from "@/shared/ui";

import ApplySwMileageBasicInfo from "./ApplySwMileageBasicInfo";
import ApplySwMileageDocument from "./ApplySwMileageDocument";

export default function MileageRegistrationPage() {
	const { connectKaiaWallet } = useKaiaWallet();
	const { call } = useKaiaContract();
	connectKaiaWallet();
	const { data: isPaused } = useSuspenseQuery({
		queryKey: ["is-paused"],
		queryFn: async () => {
			const result = (await call({
				contractType: ContractEnum.STUDENT_MANAGER,
				contractAddress: STUDENT_MANAGER_CONTRACT_ADDRESS,
				method: "paused",
				args: [],
			})) as boolean;

			return result;
		},
	});

	if (isPaused) {
		toast.error(
			"SW 마일리지 신청이 비활성화되었습니다.\n공지사항을 확인해주세요.",
		);
		return <Navigate to="/"/>;
	}

	return (
		<PageBoundary>
			<PageLayout title="SW 마일리지 신청 내역">
				<div className="grid gap-4 w-full">
					<p className="text-sm text-muted-foreground whitespace-pre-wrap">
						본 페이지는 비교과 활동에 대한 SW 마일리지 적립을 신청하는 곳입니다.
						<br />
						수행하신 활동 내용을 정확히 기입하고 증빙 자료를 첨부하여 제출해
						주시기 바랍니다.
					</p>
					<Separator />
					<div className="flex gap-4 w-full">
						<ApplySwMileageBasicInfo />
						<ApplySwMileageDocument />
					</div>
				</div>
			</PageLayout>
		</PageBoundary>
	);
}
