import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { loginUser } from "../schemas/users.schemaZod";


export class ValidUsersBody2 {
   static execute(req: Request, res: Response, next: NextFunction) {
      try {
         loginUser.parse(req.body)

         next()

      } catch (error) {
         if (error instanceof z.ZodError) {

            return res.status(409).json(error)

         }

         next(error)
      }
   }
}