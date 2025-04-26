import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TTasks } from "../schemas/tasks.schemaZod";
import jwt from "jsonwebtoken";

@injectable()
export class TasksServices {
    async create(task: TTasks, token: string) {
        const user = jwt.decode(token) as { id: number, name: string, email: string }

        const newTask = await prisma.task.create({ data: { ...task, userId: user.id } })

        const { userId, ...rest } = newTask

        return rest
    }

    async read(busca?: string | undefined, user?: any) {

        const data = await prisma.task.findMany({ where: { userId: user.id }, include: { category: true } })

        let data2 = data.map(({ categoryId, userId, ...resto }) => resto)

        if (busca !== undefined) {
            const response = data2.filter(element => element.category?.name.toLowerCase() == busca.toLowerCase())

            return response

        } else {

            return data2
        }
    }

    async getToId(id: number, user?: any) {
        const data = await prisma.task.findMany({ where: { userId: user.id }, include: { category: true } })

        let data2 = data.map(({ categoryId, userId, ...rest }) => rest)

        let data3 = data2.find(element => element.id == id)

        return data3
    }

    async update(id: number, task: TTasks) {
        const data = await prisma.task.update({ where: { id: id }, data: task })

        const { userId, ...rest } = data

        return rest
    }

    async delete(id: number) {
        const data = await prisma.task.delete({ where: { id: id } })

        return data
    }

}