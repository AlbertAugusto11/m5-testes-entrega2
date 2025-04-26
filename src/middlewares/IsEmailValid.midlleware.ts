import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";

export class IsEmailValid {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const findEmail = await prisma.user.findFirst({ where: { email: req.body.email } })

        if (findEmail) {

            return res.status(409).json({ message: "This email is already registered" })
        }

        next()
    }
}