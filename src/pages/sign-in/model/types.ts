import { z } from "zod";

import { signInSchema } from "./validations";

type ISignInForm = z.infer<typeof signInSchema>;

export type { ISignInForm };
