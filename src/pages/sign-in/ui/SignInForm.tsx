import type { SubmitHandler } from "react-hook-form";
import type { ISignInForm } from "../model";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Button, Input, Label, Separator } from "@shared/ui";

import { useStudentSignIn } from "../api";
import { signInSchema } from "../model";

const SignInForm = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignInForm>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			studentId: "",
			password: "",
		},
	});

	const { mutateAsync } = useStudentSignIn();

	const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
		try {
			const response = await mutateAsync({
				studentId: data.studentId,
				password: data.password,
			});
			console.log(response);
			toast(`${response.name}님, 로그인되었습니다.`);
			navigate("/");
			window.location.reload();
		} catch (error) {
			console.log(error);
			toast.error("로그인에 실패했습니다.");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-l font-bold">로그인</h1>
				<p className="text-balance text-sm text-muted-foreground">
					경희대학교 소프트웨어 중심사업단 SW 마일리지
				</p>
			</div>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<div className="flex justify-between w-full">
						<Label htmlFor="student_id">학번</Label>
						{errors.studentId && (
							<p className="text-xs leading-none text-destructive">
								{errors.studentId.message}
							</p>
						)}
					</div>
					<Input
						id="student_id"
						type="text"
						placeholder="학번을 입력해주세요."
						{...register("studentId")}
					/>
				</div>
				<div className="grid gap-2">
					<div className="flex justify-between w-full">
						<Label htmlFor="password">비밀번호</Label>
						{errors.password && (
							<p className="text-xs leading-none text-destructive">
								{errors.password.message}
							</p>
						)}
					</div>
					<Input
						id="password"
						type="password"
						placeholder="비밀번호를 입력해주세요."
						{...register("password")}
					/>
				</div>
				<Button type="submit" className="w-full">
					로그인
				</Button>
				<Separator />
			</div>
			<div className="text-center text-sm">
				계정이 없으신가요?{" "}
				<a href="/sign-up" className="text-link">
					회원가입
				</a>
			</div>
		</form>
	);
};

export default SignInForm;
