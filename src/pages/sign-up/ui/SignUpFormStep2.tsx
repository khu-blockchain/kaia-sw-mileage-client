import type { Address } from "@kaiachain/viem-ext";
import type { SubmitHandler } from "react-hook-form";
import type { ISignUpForm } from "../models";

import { useEffect } from "react";

import { encodePacked, keccak256 } from "@kaiachain/viem-ext";
import { Controller, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import {
	ContractEnum,
	KaiaButton,
	useKaiaAccount,
	useKaiaContract,
	useKaiaWallet,
} from "@features/kaia";
import { BANK_CODE } from "@/shared/config";
import {
	Button,
	ErrorMessage,
	Input,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	Separator,
} from "@/shared/ui";

import { useStudentSignUp } from "../api";

interface SignUpFormStep2Props {
	setCurrentStep: (step: 1 | 2) => void;
}

const SignUpFormStep2 = ({ setCurrentStep }: SignUpFormStep2Props) => {
	const navigate = useNavigate();
	const { currentAccount } = useKaiaAccount();
	const { connectKaiaWallet } = useKaiaWallet();
	const { encodeAbi, requestSignTransaction } = useKaiaContract();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		control,
		trigger,
	} = useFormContext<ISignUpForm>();

	const { mutateAsync, isPending } = useStudentSignUp();

	const onStep2Submit: SubmitHandler<ISignUpForm> = async (data) => {
		const isValid = await trigger([
			"walletAddress",
			"bankAccountNumber",
			"bankCode",
		]);
		//이미 step1을 통과했으므로, 2를 통과하면 모든 데이터가 존재한다고 가정할 수 있음.
		if (!isValid) {
			return;
		}

		try {
			const studentIdHash = keccak256(
				encodePacked(["string"], [data.studentId!]),
			);
			const encodeData = encodeAbi(
				"registerStudent",
				ContractEnum.STUDENT_MANAGER,
				[studentIdHash],
			);

			const rawTransaction = await requestSignTransaction(
				import.meta.env.VITE_STUDENT_MANAGER_CONTRACT_ADDRESS,
				encodeData,
			);

			const response = await mutateAsync({
				studentId: data.studentId!,
				password: data.password!,
				passwordConfirm: data.confirmPassword!,
				name: data.name!,
				email: data.email!,
				walletAddress: data.walletAddress! as Address,
				department: data.department!,
				bankAccountNumber: data.bankAccountNumber!,
				bankCode: data.bankCode!,
				personalInformationConsentStatus: true,
				rawTransaction: rawTransaction,
				studentHash: studentIdHash,
			});
			toast.success(`${response.name}님, 회원가입이 완료되었습니다.`);
			navigate("/sign-in");
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (currentAccount) {
			setValue("walletAddress", currentAccount);
		}
	}, [currentAccount, setValue]);

	return (
		<form onSubmit={handleSubmit(onStep2Submit)} className="grid gap-4 mt-4">
			<div className="flex flex-col justify-start">
				<div className="flex justify-between">
					<Controller
						name="bankCode"
						control={control}
						render={({ field }) => (
							<Select onValueChange={field.onChange} value={field.value}>
								<SelectTrigger className="w-[160px]">
									<SelectValue placeholder="은행을 선택하세요" />
								</SelectTrigger>
								<SelectContent className="w-[160px]">
									<SelectGroup>
										<SelectLabel>은행</SelectLabel>
										{Object.entries(BANK_CODE).map(([key, value]) => (
											<SelectItem key={key} value={key}>
												{value}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					/>
					<Input
						className="w-[280px]"
						id="bankAccountNumber"
						type="text"
						placeholder="계좌번호를 입력해주세요.(-제외)"
						autoComplete="off"
						required
						{...register("bankAccountNumber")}
					/>
				</div>
				{errors.bankCode?.message && (
					<ErrorMessage
						className="ml-3"
						errors={errors}
						fields={[{ field: "bankCode", label: "은행" }]}
					/>
				)}
			</div>

			<Separator />
			<div className="flex flex-col gap-4">
				<Input
					disabled={true}
					id="walletAddress"
					type="text"
					autoComplete="off"
					placeholder="연결된 지갑의 주소가 표시됩니다."
					{...register("walletAddress")}
				/>
				<ul className="list-disc ml-4">
					<li className="text-xs text-muted-foreground whitespace-pre-wrap">
						아래의 지갑 연결 버튼을 눌러 Kaia를 연결하세요.
					</li>
					<li className="text-xs text-muted-foreground whitespace-pre-wrap">
						Kaia가 열리지 않는다면 페이지를 새로고침 해주세요.
					</li>
				</ul>
			</div>
			<div className="flex justify-between gap-4 ">
				<Button
					type="button"
					variant="secondary"
					className="w-20 h-10 rounded-md"
					onClick={() => setCurrentStep(1)}
				>
					이전으로
				</Button>
				{!currentAccount ? (
					<KaiaButton.DefaultButton
						onClick={() => connectKaiaWallet()}
						className="w-full"
					/>
				) : (
					<Button
						disabled={isPending}
						type="submit"
						className="flex-1 w-full h-10 rounded-md"
					>
						회원가입
					</Button>
				)}
			</div>
		</form>
	);
};

export default SignUpFormStep2;
