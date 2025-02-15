import { signInSchema, signUpSchema } from "./schema";
import z from "zod"
export type SignUpType = z.infer<typeof signUpSchema>

export type SignInType = z.infer<typeof signInSchema>