import { z } from "zod";

const registerDocumentSchema = z.object({
  studentId: z.string().nonempty("학번을 입력해주세요."),
  mileageActivityId: z.string(),
  mileageCategoryName: z.string().nonempty("활동 분야를 선택해주세요."),
  mileageDescription: z.string().nonempty("활동 설명을 입력해주세요."),
});

export { registerDocumentSchema };
