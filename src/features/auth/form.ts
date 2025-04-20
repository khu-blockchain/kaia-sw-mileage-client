import { z } from "zod";

const signInSchema = z.object({
  student_id: z.string().nonempty("학번을 입력해주세요."),
  password: z.string().nonempty("비밀번호를 입력해주세요."),
})

type ISignInForm = z.infer<typeof signInSchema>;

export {
  signInSchema
}

export type {
  ISignInForm
}