import type { MileagePointHistory } from "@/shared/api";

import { useMemo } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AlertCircle, CircleCheck, CircleDot } from "lucide-react";
import { useParams } from "react-router";

import { mileageQueries } from "@entities/mileage";
import { MILEAGE_POINT_HISTORY_TYPE, MILEAGE_STATUS } from "@/shared/api";
import { parseToFormattedDate } from "@/shared/lib";
import { sliceWalletAddress } from "@/shared/lib/web3";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui";

const MileageHistoryDetail = () => {
	const { id: swMileageId } = useParams();
	const { data } = useSuspenseQuery(
		mileageQueries.getMyMileageDetail(Number(swMileageId)),
	);

	const handleFileDownload = (fileUrl: string, fileName: string) => {
		// 새 탭에서 파일 URL 열기 (브라우저에서 자동으로 다운로드 처리)
		const link = document.createElement("a");
		link.href = fileUrl;
		link.download = fileName;
		link.target = "_blank";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const mileagePointAmount = useMemo(() => {
		return data.mileage_point_histories?.reduce(
			(acc: number, curr: MileagePointHistory) => {
				if (curr.type === MILEAGE_POINT_HISTORY_TYPE.MILEAGE_BURNED) {
					return acc - curr.mileage_point;
				}
				return acc + curr.mileage_point;
			},
			0,
		);
	}, [data.mileage_point_histories]);

	const detailContentMapper = useMemo(() => {
		return {
			student: {
				studentId: {
					label: "학번",
					value: data.student?.student_id,
				},
				name: {
					label: "이름",
					value: data.student?.name ?? "-",
				},
				department: {
					label: "학과",
					value: data.student?.department ?? "-",
				},
				walletAddress: {
					label: "지갑 주소",
					value: sliceWalletAddress(data.student?.wallet_address ?? "", 6),
				},
				email: {
					label: "이메일",
					value: data.student?.email ?? "-",
				},
			},
			document: {
				mileageCategoryName: {
					label: "활동 분야",
					value: data.mileage_category_name,
				},
				mileageActivityName: {
					label: "비교과 활동",
					value: data.mileage_activity_name,
				},
				mileageDescription: {
					label: "활동 설명",
					value: data.mileage_description,
				},
			},
		};
	}, [data]);

	return (
		<div className="flex flex-col gap-2 w-full">
			<SwMileageStatus
				status={data.status as MILEAGE_STATUS}
				comment={data.admin_comment ?? "-"}
			/>

			<div className="content-container">
				<div className="flex gap-2">
					<div className="flex flex-col gap-4 h-min w-50">
						<p className="text-xl font-semibold">기본 정보</p>
						<div className="flex flex-col gap-3">
							{Object.entries(detailContentMapper.student).map(
								([key, value]) => (
									<div key={key} className="grid gap-1">
										<p className="text-sm text-muted-foreground">
											{value.label}
										</p>
										<p className="text-md text-body">{value.value}</p>
									</div>
								),
							)}
						</div>
					</div>
					<div className="h-full w-[1px] bg-gray-200 mx-6" />
					<div className="flex flex-col flex-1 gap-4 w-full h-min">
						<div className="flex items-center justify-between">
							<p className="text-xl font-semibold">제출 정보</p>
							<p className="text-sm text-muted-foreground">
								제출 일자: {parseToFormattedDate(data.created_at)}
							</p>
						</div>
						<div className="grid grid-cols-1 gap-6">
							{data.status === MILEAGE_STATUS.APPROVED && (
								<>
									<div className="flex flex-col gap-1">
										<p className="text-sm text-muted-foreground">
											지급된 마일리지 토큰
										</p>
										<p className="text-md font-semibold text-body">
											{data.mileage_point_histories?.[0]?.mileage_token_name ??
												"-"}
										</p>
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-sm text-muted-foreground">
											지급된 토큰 개수
										</p>
										<p className="text-md font-semibold text-body">
											{mileagePointAmount}개
										</p>
									</div>
								</>
							)}
							{Object.entries(detailContentMapper.document).map(
								([key, value]) => (
									<div key={key} className="grid gap-1">
										<p className="text-sm text-muted-foreground">
											{value.label}
										</p>
										<p className="text-md text-body whitespace-pre-wrap">
											{value.value}
										</p>
									</div>
								),
							)}
							<div className="flex flex-col gap-1">
								<p className="text-sm text-muted-foreground">제출 파일</p>
								<div className="flex flex-col gap-1">
									{data.mileage_files?.length === 0 && (
										<p className="text-md text-body break-all font-semibold">
											제출된 파일이 없습니다.
										</p>
									)}
									{data.mileage_files?.map((file) => (
										<div key={file.id} className="flex gap-1">
											<button
												onClick={() =>
													handleFileDownload(file.url, file.original_file_name)
												}
												className="text-md text-blue-600 hover:text-blue-800 hover:underline break-all text-left cursor-pointer transition-colors"
											>
												{file.original_file_name}
											</button>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MileageHistoryDetail;

const SwMileageStatus = ({
	status,
	comment,
}: {
	status: MILEAGE_STATUS;
	comment: string;
}) => {
	const statusText = {
		[MILEAGE_STATUS.REVIEWING]: {
			text: "SW 마일리지 신청이 심사 중입니다.",
			description: "제출된 서류를 바탕으로 심사가 진행중입니다.",
			icon: <CircleDot color="var(--pending)" className="w-4 h-4" />,
		},
		[MILEAGE_STATUS.APPROVED]: {
			text: "SW 마일리지 신청이 승인되었습니다.",
			description: "Kaia 계정에 마일리지가 지급되었는지 확인하세요.",
			icon: <CircleCheck color="var(--approved)" className="w-4 h-4" />,
		},
		[MILEAGE_STATUS.REJECTED]: {
			text: "SW 마일리지 신청이 반려되었습니다. 반려 사유를 확인하세요.",
			description: comment ?? "-",
			icon: <AlertCircle color="var(--destructive)" className="w-4 h-4" />,
		},
	};
	return (
		<Alert>
			{statusText[status].icon}
			<AlertTitle>{statusText[status].text}</AlertTitle>
			<AlertDescription>{statusText[status].description}</AlertDescription>
		</Alert>
	);
};
