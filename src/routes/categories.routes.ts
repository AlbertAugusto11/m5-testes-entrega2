import { Router } from "express";
import { CategoryControllers } from "../controllers/category.controllers";
import { IsCategoryValid2 } from "../middlewares/IsCategoryValid2.midlleware";
import { ValidCategoryBody } from "../middlewares/validCategoryBody.midlleware";
import { container } from "tsyringe";
import { CategoryServices } from "../services/category.services";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { IsUserValid } from "../middlewares/IsUserValid.midlleware";

export const categoriesRoutes = Router()

container.registerSingleton("CategoryServices", CategoryServices)
const categoryControllers = container.resolve(CategoryControllers)

categoriesRoutes.post("/", verifyToken.execute, ValidCategoryBody.execute, (req, res) => categoryControllers.create(req, res))

categoriesRoutes.delete("/:id", verifyToken.execute, IsCategoryValid2.execute, IsUserValid.execute, (req, res) => categoryControllers.delete(req, res))