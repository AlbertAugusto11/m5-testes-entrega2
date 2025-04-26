import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";
import { inject, injectable } from "tsyringe";


@injectable()
export class CategoryControllers {
    constructor(@inject("CategoryServices") private categoryservices: CategoryServices) { }

    async create(req: Request, res: Response) {

        const reponse = await this.categoryservices.create(req.body, req.headers.authorization as string)

        return res.status(201).json(reponse)
    }

    async delete(req: Request, res: Response) {

        const reponse = await this.categoryservices.delete(Number(req.params.id))

        return res.status(204).json(reponse)
    }
}