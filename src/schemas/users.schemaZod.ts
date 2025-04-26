import { number, z } from "zod";

export const createUserBody = z.object({
    id: z.number().optional(),
    name: z.string(),
    email: z.string().email(),
    password: z.string()
}).strict()

export type TUser = z.infer<typeof createUserBody>

export const loginUser = z.object({
    email: z.string().email(),
    password: z.string()

}).strict()

export type TUserLogin = z.infer<typeof loginUser>