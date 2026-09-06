import express from "express"
import { checkToken } from "../middleware/authorization.js"
import { sendMessage } from "../controllers/aiControllers.js"

const aiRouter = express.Router()

aiRouter.post("/chat", checkToken, sendMessage)

export {aiRouter}