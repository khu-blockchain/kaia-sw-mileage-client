import { z } from "zod";

const createTokenSchema = z.object({
  swMileageTokenName: z.string(),
  symbol: z.string(),
  description: z.string(),
})

type ICreateTokenForm = z.infer<typeof createTokenSchema>;

export {
  createTokenSchema
}

export type {
  ICreateTokenForm
}