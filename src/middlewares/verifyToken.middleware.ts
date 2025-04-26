import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken"

export class verifyToken {
   static execute(req: Request, res: Response, next: NextFunction) {
      const token = req.headers.authorization;

      if (!token) {
         throw new AppError(401, "Token is required")

      } else {
         jwt.verify(token, process.env.JWT_KEY as string)
         const decode = jwt.decode(token) as { id: number, name: string, email: string, iat: number, exp: number }

         res.locals.user = decode
      }

      next()

   }
}