import express from "express"
import { accountRouter } from "./routes/accountRoutes.js"
import { subjectsRouter } from "./routes/subjectsRoutes.js"
import { tasksRouter } from "./routes/tasksRoutes.js"
import { pageRouter } from "./routes/pageRoutes.js"
import { dashboardRouter } from "./routes/dashboardRoutes.js"
import { aiRouter } from "./routes/aiRoutes.js"
import { errorHandler, notFoundHandler } from "./middleware/handlers.js"
import path from "path"
import { fileURLToPath } from "url"
import cookieParser from "cookie-parser"

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use((req, res, next) => {
    console.log("Запрос получен.")
    console.log(`Метод: ${req.method}. Путь: ${req.path}`)
    next()
})

app.use(cookieParser())

app.use(express.json())

app.use(express.static(path.join(__dirname, "../docs")))

app.use("/", pageRouter)
app.use("/account", accountRouter)
app.use("/api/subjects", subjectsRouter)
app.use("/api/tasks", tasksRouter)
app.use("/api/dashboard", dashboardRouter)
app.use("/api/ai", aiRouter)

app.use(errorHandler)
app.use(notFoundHandler)

app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
    console.log("Server started.")
})