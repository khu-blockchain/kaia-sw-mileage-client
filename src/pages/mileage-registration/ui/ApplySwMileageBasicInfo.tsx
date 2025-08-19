import { useSuspenseQuery } from "@tanstack/react-query";

import { studentQueries } from "@entities/student";
import { sliceWalletAddress } from "@shared/lib/web3";
import { Separator } from "@shared/ui";

type StudentInfoKey =
	| "studentId"
	| "name"
	| "department"
	| "email"
	| "walletAddress";

const ApplySwMileageBasicInfo = () => {
	const { data: student } = useSuspenseQuery(studentQueries.getMe());

	const basicInfoMapper: Record<StudentInfoKey, string> = {
		studentId: "학번",
		name: "이름",
		department: "학과",
		email: "이메일",
		walletAddress: "지갑 주소",
	};

	return (
		<div className="sticky top-24 h-min content-container w-[380px]">
			<div className="grid gap-2">
				<p className="text-xl font-semibold">기본 정보</p>
				<p className="text-sm text-muted-foreground whitespace-pre-wrap">
					{"기본 정보는 가입 시 등록된 정보를 바탕으로 기입됩니다."}
				</p>
			</div>
			<Separator />
			<div className="flex flex-col gap-4">
				{Object.entries(basicInfoMapper).map(([key, value]) => {
					const parsedStudent = {
						studentId: student.student_id,
						name: student.name,
						department: student.department,
						email: student.email,
						walletAddress: sliceWalletAddress(student.wallet_address, 6),
					};
					const studentKey = key as StudentInfoKey;
					return (
						<div className="flex items-center justify-between" key={key}>
							<p className="text-sm font-medium text-body">{value}</p>
							<p className="text-sm text-body">{parsedStudent[studentKey]}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ApplySwMileageBasicInfo;
