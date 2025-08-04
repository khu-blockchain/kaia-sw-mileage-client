import { z } from "zod";

import { signUpSchema } from "./validations";

type ISignUpForm = z.infer<typeof signUpSchema>;

export type { ISignUpForm };