import "reflect-metadata";
import express, { json } from "express";
import helmet from "helmet";
import { tasksRoutes } from "./routes/tasks.routes";
import { categoriesRoutes } from "./routes/categories.routes";
import { usersRoutes } from "./routes/users.routes";
import { HandleErrors } from "./errors/handleErrors.middleware";

export const app = express()

app.use(json())

app.use(helmet())

app.use("/users", usersRoutes)

app.use("/tasks", tasksRoutes)

app.use("/categories", categoriesRoutes)

app.use(HandleErrors.execute)