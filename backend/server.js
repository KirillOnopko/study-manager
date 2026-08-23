import express from "express"
import { accountRouter } from "./routes/accountRoutes.js"
import { subjectsRouter } from "./routes/subjectsRoutes.js"
import { tasksRouter } from "./routes/tasksRoutes.js"
import { pageRouter } from "./routes/pageRoutes.js"
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

app.use(express.static(path.join(__dirname, "../frontend")))

app.use("/", pageRouter)
app.use("/account", accountRouter)
app.use("/subjects", subjectsRouter)
app.use("/tasks", tasksRouter)

app.use(errorHandler)
app.use(notFoundHandler)

app.listen(3000, () => {
    console.log("Server started.")
})

/* ТЕМНАЯ
#0F172A — основной фон
#1E293B — поверхности: формы, карточки, header, sidebar
#334155 — вторичные поверхности, borders, input'ы
#60A5FA — акцент: кнопки, ссылки, активные элементы
#E2E8F0 — основной текст
*/

/* СВЕТЛАЯ
#F8FAFC — основной фон
#E2E8F0 — поверхности: формы, карточки, header
#CBD5E1 — borders, input'ы, вторичные элементы
#2563EB — акцент
#0F172A — основной текст
*/