import { z } from "zod";

const registerDocumentSchema = z.object({
  studentId: z.string(),
  name: z.string(),
  department: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  walletAddress: z.string(),
  content: z.string().nonempty("내용을 입력해주세요."),
  academicField: z.string().nonempty("분야를 선택해주세요."),
  extracurricularActivity: z.string(),
  extracurricularActivityClassification: z.string().optional(),
});

type IRegisterDocumentForm = z.infer<typeof registerDocumentSchema>;

export { registerDocumentSchema };

export type { IRegisterDocumentForm };
