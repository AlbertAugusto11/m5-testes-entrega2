import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TCategories } from "../schemas/categories.schemaZod";
import jwt from "jsonwebtoken"


@injectable()
export class CategoryServices {
    async create(category: TCategories, token: string) {
        const decode = jwt.decode(token) as { id: number, name: string }

        const newCategory = await prisma.category.create({ data: { ...category, userId: decode.id } })

        const { userId, ...rest } = newCategory

        return rest
    }

    async delete(id: number) {
        const deleteCategory = await prisma.category.delete({ where: { id: id } })

    }
}