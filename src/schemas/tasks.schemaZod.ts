import { z } from "zod"

export const createTasksBody = z.object({
    id: z.number().optional(),
    title: z.string(),
    content: z.string(),
    finished: z.boolean().optional(),
    categoryId: z.number().optional()

}).strict()

export type TTasks = z.infer<typeof createTasksBody>