import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { createUserBody } from "../schemas/users.schemaZod";

export class ValidUsersBody {
   static execute(req: Request, res: Response, next: NextFunction) {
      try {
         createUserBody.parse(req.body)

         next()

      } catch (error) {
         if (error instanceof z.ZodError) {

            return res.status(400).json(error)

         }

         next(error)
      }
   }
}