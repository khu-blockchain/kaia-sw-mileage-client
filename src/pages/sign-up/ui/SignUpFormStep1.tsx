import { useFormContext } from "react-hook-form";

import { Button, Separator, ErrorMessage } from "@/shared/ui";

import { type ISignUpForm } from "../models";
import RowLabelFormInput from "./SignUpFormInput";

const SignUpFormStep1 = ({
	setCurrentStep,
}: {
	setCurrentStep: (step: 1 | 2) => void;
}) => {
	const {
		register,
		formState: { errors },
		trigger,
	} = useFormContext<ISignUpForm>();

	const handleStep1Submit = async () => {
		const isValid = await trigger([
			"studentId",
			"password",
			"confirmPassword",
			"name",
			"department",
			"email",
		]);
		if (isValid) {
			setCurrentStep(2);
		}
	};

	return (
		<div className="mt-4 grid gap-5">
			<RowLabelFormInput
				label="학번"
				id="student_id"
				type="text"
				placeholder="학번을 입력해주세요."
				{...register("studentId")}
				required
			/>
			     
           <RowLabelFormInput
				label="이름"
				id="name"
				type="text"
				placeholder="이름을 입력해주세요."
				{...register("name")}
				required
				autoComplete="off"
			/>
			<RowLabelFormInput
				label="학과"
				id="department"
				type="text"
				placeholder="학과를 입력해주세요."
				{...register("department")}
				required
				autoComplete="off"
			/>
			<RowLabelFormInput
				label="이메일"
				id="email"
				type="text"
				placeholder="이메일을 입력해주세요."
				{...register("email")}
				required
				autoComplete="email"
			/>
        {(errors.name?.message ||
				errors.department?.message ||
				errors.email?.message) && (
				<ErrorMessage
					className="ml-30"
					errors={errors}
					fields={[
						{ field: "studentId", label: "학번" },
						{ field: "name", label: "이름" },
						{ field: "department", label: "학과" },
						{ field: "email", label: "이메일" },
					]}
				/>
			)}
			<Separator />
      <RowLabelFormInput
				label="비밀번호"
				id="password"
				type="password"
				placeholder="비밀번호를 입력해주세요."
				{...register("password")}
				required
			/>
			<RowLabelFormInput
				label="비밀번호 확인"
				id="confirm-password"
				type="password"
				placeholder="동일한 비밀번호를 입력해주세요."
				{...register("confirmPassword")}
				required
			/>
			{(errors.studentId?.message ||
				errors.password?.message ||
				errors.confirmPassword?.message) && (
				<ErrorMessage
					className="ml-30"
					errors={errors}
					fields={[
						{ field: "password", label: "비밀번호" },
						{ field: "confirmPassword", label: "비밀번호 확인" },
					]}
				/>
			)}
 
			<Button
				type="button"
				onClick={() => handleStep1Submit()}
				className="w-full"
			>
				다음
			</Button>
		</div>
	);
};

export default SignUpFormStep1;
