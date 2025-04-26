import { NextFunction, Request, Response } from "express";
import { createCategoriesBody } from "../schemas/categories.schemaZod";
import { z } from "zod";


export class ValidCategoryBody {
   static execute(req: Request, res: Response, next: NextFunction) {
      try {
         createCategoriesBody.parse(req.body)

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