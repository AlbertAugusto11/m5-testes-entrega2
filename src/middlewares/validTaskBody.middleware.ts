import { NextFunction, Request, Response } from "express";
import { createTasksBody } from "../schemas/tasks.schemaZod";
import { z } from "zod";

export class ValidTaskBody {
   static execute(req: Request, res: Response, next: NextFunction) {
      try {
         createTasksBody.parse(req.body)

         next()

      } catch (error) {
         if (error instanceof z.ZodError) {
            let editError = {
               errors: error.issues
            }

            return res.status(400).json(editError)

         }

         next(error)
      }
   }
}