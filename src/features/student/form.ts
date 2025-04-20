import { z } from "zod";

const signUpSchema = z
  .object({
    student_id: z.string().nonempty("학번을 입력해주세요.").length(10, "학번은 10자리여야 합니다."),
    password: z.string().nonempty("비밀번호를 입력해주세요."),
    confirm_password: z.string(),
    email: z
      .string()
      .nonempty("이메일을 입력해주세요.")
      .email("올바른 이메일 형식이 아닙니다."),
    name: z.string().nonempty("이름을 입력해주세요."),
    phone_number: z
      .string()
      .nonempty("전화번호를 입력해주세요.")
      .regex(
        /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-[0-9]{3,4}-[0-9]{4}$/,
        "올바른 형식이 아닙니다."
      ),
    department: z.string().nonempty("학과를 입력해주세요."),
    bank_account_number: z.string().nonempty("계좌번호를 입력해주세요."),
    bank_code: z.string().nonempty("은행코드를 입력해주세요."),
    wallet_address: z.string().nonempty("지갑주소를 입력해주세요."),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "비밀번호가 일치하지 않습니다.",
  });

type ISignUpForm = z.infer<typeof signUpSchema>;

export { signUpSchema };

export type { ISignUpForm };
