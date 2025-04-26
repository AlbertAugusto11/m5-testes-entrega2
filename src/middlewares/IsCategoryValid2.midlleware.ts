import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";

export class IsCategoryValid2 {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const categoryId = Number(req.params.id)

        const findCategoryId = await prisma.category.findFirst({ where: { id: categoryId } })

        if (!findCategoryId) {
            return res.status(404).json({ message: "Category not found" })
        }

        next()
    }
}