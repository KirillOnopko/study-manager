import express from "express"
import { accountRouter } from "./routes/accountRoutes.js"
import { subjectsRouter } from "./routes/subjectsRoutes.js"
import { tasksRouter } from "./routes/tasksRoutes.js"
import { errorHandler, notFoundHandler } from "./middleware/handlers.js"

const app = express()

app.use((req, res, next) => {
    console.log("Запрос получен.")
    console.log(`Метод: ${req.method}. Путь: ${req.path}`)
    next()
})

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({"message": "Все работает."})
})

app.use("/account", accountRouter)
app.use("/subjects", subjectsRouter)
app.use("/tasks", tasksRouter)

app.use(errorHandler)
app.use(notFoundHandler)

app.listen(3000, () => {
    console.log("Server started.")
})