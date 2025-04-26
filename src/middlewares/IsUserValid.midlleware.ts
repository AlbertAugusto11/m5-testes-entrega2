import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma"

export class IsUserValid {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const findUser = await prisma.user.findFirst({ where: { id: res.locals.user.id }, include: { categories: true } })
        const data = findUser?.categories.find(element => element.id == Number(req.params.id))

        if (data == undefined) {
            return res.status(403).json({ message: "This user is not the category owner" })
        }

        next()

    }
}