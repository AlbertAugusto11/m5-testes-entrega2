import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";

export class IsCategoryValid {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const categoryId = req.body.categoryId

        if (categoryId !== undefined) {
            const findCategoryId = await prisma.category.findFirst({ where: { id: categoryId } })
            const findUserId = findCategoryId?.userId == res.locals.user.id

            if (!findCategoryId) {
                return res.status(404).json({ message: "Category not found" })
            }
            if (findUserId == false) {
                return res.status(403).json({ message: "This user is not the task owner" })
            }
        }

        next()
    }
}