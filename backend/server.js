import express from "express"
import { accountRouter } from "./routes/accountRoutes.js"

const app = express()

app.use((req, res, next) => {
    console.log("Запрос получен.")
    console.log(`Метод: ${req.method}. Путь: ${req.path}`)
    next()
})

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json("Все работает.")
})

app.use("/account", accountRouter)

app.listen(3000, () => {
    console.log("Server started.")
})