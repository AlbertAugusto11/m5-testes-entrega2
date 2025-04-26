import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";

export class IsCategoryValid3 {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const busca = req.query.category as string | undefined

        if (busca !== undefined) {
            const findCategory = await prisma.task.findMany({ include: { category: true } })
            const data = findCategory.map(({ categoryId, ...resto }) => resto)
            const findInData = data.filter(element => element.category?.name.toLowerCase() == busca.toLowerCase())

            if (findInData.length == 0) {
                return res.status(404).json({ message: "Category not found" })
            }
        }

        next()
    }
}