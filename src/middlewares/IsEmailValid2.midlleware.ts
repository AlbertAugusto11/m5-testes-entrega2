import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";

export class IsEmailValid2 {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const findUser = await prisma.user.findFirst({ where: { email: req.body.email } })


        if (!findUser) {

            return res.status(404).json({ messsage: "User not exists" })
        }

        next()
    }
}