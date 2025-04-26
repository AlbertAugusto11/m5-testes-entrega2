import { Request, Response } from "express";
import { TasksServices } from "../services/tasks.services";
import { inject, injectable } from "tsyringe";


@injectable()
export class TasksControllers {
    constructor(@inject("TasksServices") private tasksservices: TasksServices) { }

    async create(req: Request, res: Response) {

        const response = await this.tasksservices.create(req.body, req.headers.authorization as string)

        return res.status(201).json(response)
    }

    async read(req: Request, res: Response) {

        const response = await this.tasksservices.read(req.query.category as string | undefined, res.locals.user)

        return res.status(200).json(response)
    }

    async getToId(req: Request, res: Response) {

        const response = await this.tasksservices.getToId(Number(req.params.id), res.locals.user)

        return res.status(200).json(response)
    }

    async update(req: Request, res: Response) {

        const response = await this.tasksservices.update(Number(req.params.id), req.body)

        return res.status(200).json(response)

    }

    async delete(req: Request, res: Response) {

        const response = await this.tasksservices.delete(Number(req.params.id))

        return res.status(204).json(response)
    }

}