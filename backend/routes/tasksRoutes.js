import express from "express"
import { getTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/tasksController.js"
import { checkToken } from "../middleware/authorization.js"
import { checkParamsId } from "../middleware/validation.js"
import { createTaskValidator, updateTaskValidator } from "../middleware/validation.js"

const tasksRouter = express.Router()

tasksRouter.get("/", checkToken, getTasks)
tasksRouter.get("/:id", checkToken, checkParamsId, getTask)
tasksRouter.post("/", checkToken, createTaskValidator, createTask)
tasksRouter.patch("/:id", checkToken, checkParamsId, updateTaskValidator, updateTask)
tasksRouter.delete("/:id", checkToken, checkParamsId, deleteTask)

export {tasksRouter}