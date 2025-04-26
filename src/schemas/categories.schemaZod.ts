import { z } from "zod"

export const createCategoriesBody = z.object({
    id: z.number().optional(),
    name: z.string(),

}).strict()

export type TCategories = z.infer<typeof createCategoriesBody>