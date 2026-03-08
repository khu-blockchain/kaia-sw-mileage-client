import { z } from "zod";

const signUpSchema = z
	.object({
		studentId: z
			.string()
			.nonempty("학번을 입력해주세요.")
			.length(10, "학번은 10자리여야 합니다."),
		password: z.string().nonempty("비밀번호를 입력해주세요."),
		confirmPassword: z.string(),
		email: z
			.email("올바른 이메일 형식이 아닙니다.")
			.nonempty("이메일을 입력해주세요."),
		name: z.string().nonempty("이름을 입력해주세요."),
		department: z.string().nonempty("학과를 입력해주세요."),
		bankAccountNumber: z.string().nonempty("계좌번호를 입력해주세요."),
		bankCode: z.string().nonempty("은행코드를 입력해주세요."),
		walletAddress: z.string().nonempty("지갑주소를 입력해주세요."),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "비밀번호가 일치하지 않습니다.",
	});

export { signUpSchema };
