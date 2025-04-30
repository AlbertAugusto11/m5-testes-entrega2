import { inject, injectable } from "tsyringe";
import { UsersServices } from "../services/users.services";
import { Request, Response } from "express";

@injectable()
export class UsersControllers {
    constructor(@inject("UsersServices") private usersservices: UsersServices) { }

    async register(req: Request, res: Response) {
        const response = await this.usersservices.register(req.body)

        return res.status(201).json(response)
    }

    async login(req: Request, res: Response) {
        const response = await this.usersservices.login(req.body)

        if (response == "Email and password doesn't match") {
            return res.status(401).json({ message: response })

        } else {
            return res.status(200).json(response)

        }
    }

    autoLogin(req: Request, res: Response) {
        const response = this.usersservices.autoLogin(res.locals.user)

        return res.status(200).json(response)
    }

}