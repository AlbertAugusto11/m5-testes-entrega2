import { container } from "tsyringe";
import { UsersServices } from "../services/users.services";
import { UsersControllers } from "../controllers/users.controllers";
import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { IsEmailValid } from "../middlewares/IsEmailValid.midlleware";
import { ValidUsersBody } from "../middlewares/validUsersBody.middleware";
import { IsEmailValid2 } from "../middlewares/IsEmailValid2.midlleware";
import { ValidUsersBody2 } from "../middlewares/validUsersBody2.middleware";

export const usersRoutes = Router()

container.registerSingleton("UsersServices", UsersServices)
const userscontrollers = container.resolve(UsersControllers)

usersRoutes.post("/", ValidUsersBody.execute, IsEmailValid.execute, (req, res) => userscontrollers.register(req, res))

usersRoutes.post("/login", ValidUsersBody2.execute, IsEmailValid2.execute, (req, res) => userscontrollers.login(req, res))

usersRoutes.get("/profile", verifyToken.execute, (req, res) => userscontrollers.autoLogin(req, res))