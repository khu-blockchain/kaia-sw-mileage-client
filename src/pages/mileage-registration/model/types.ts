import type { registerDocumentSchema } from "./validations";

import { z } from "zod";

type IRegisterDocumentForm = z.infer<typeof registerDocumentSchema>;
export type { IRegisterDocumentForm };
