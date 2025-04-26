import { injectable } from "tsyringe";
import { TUser, TUserLogin } from "../schemas/users.schemaZod";
import bcrypt from "bcrypt";
import { prisma } from "../database/prisma";
import jwt from "jsonwebtoken"



@injectable()
export class UsersServices {
    async register(body: TUser) {
        const hashPassword = await bcrypt.hash(body.password, 10)

        const newUser = await prisma.user.create({ data: { ...body, password: hashPassword } })

        const { password, ...rest } = newUser


        return rest
    }

    async login(body: TUserLogin) {
        const findUser = await prisma.user.findFirst({ where: { email: body.email } })

        if (findUser) {
            const compare = await bcrypt.compare(body.password, findUser.password)

            if (!compare) {

                return "Email and password doesn't match"

            } else {
                const data = { id: findUser.id, name: findUser.name, email: findUser.email }
                const token = jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: "1h" })

                return {
                    accessToken: token, user: {
                        id: findUser.id,
                        name: findUser.name,
                        email: findUser.email
                    }
                }
            }
        }

    }

    autoLogin(user: any) {

        const decode = user

        const { iat, exp, ...rest } = decode

        return rest

    }

}