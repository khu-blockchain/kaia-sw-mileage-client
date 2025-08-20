import type { Student } from "@shared/api";

import { useSuspenseQuery } from "@tanstack/react-query";
import { User } from "lucide-react";

import { studentQueries } from "@entities/student";
import { BANK_CODE } from "@shared/config";
import { sliceWalletAddress } from "@shared/lib/web3";
import { Label } from "@shared/ui";

export default function StudentProfile() {
	const { data: student } = useSuspenseQuery(studentQueries.getMe());

	const profileSections = [
		{
			title: "기본 정보",
			icon: <User className="w-5 h-5" />,
			fields: [
				{
					key: "student_id",
					label: "학번",
				},
				{
					key: "name",
					label: "이름",
				},
				{
					key: "department",
					label: "학과",
				},
				{
					key: "wallet_address",
					label: "지갑 주소",
					displayValue: sliceWalletAddress(student.wallet_address),
				},
				{
					key: "email",
					label: "이메일",
				},
				{
					key: "bank_account_number",
					label: "계좌번호",
				},
				{
					key: "bank_code",
					label: "은행",
					displayValue: BANK_CODE[student.bank_code],
				},
			],
		},
	];

	return (
		<div className="grid gap-6">
			<div className="content-container">
				<div className="flex items-center gap-2">
					<User className="w-5 h-5" />
					<h2 className="text-lg font-semibold">개인정보</h2>
				</div>

				<div className="grid gap-6">
					<div>
						<div className="grid gap-4 lg:grid-cols-2">
							{profileSections[0].fields.map((field) => (
								<div
									key={field.key}
									className="grid gap-2 pb-4 border-b border-gray-200"
								>
									<Label className="text-sm font-medium text-body">
										{field.label}
									</Label>
									<p className="text-sm text-body">
										{field.displayValue ||
											student[field.key as keyof Student] ||
											"-"}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
