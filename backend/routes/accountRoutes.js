import express from "express"
import {register, login} from "../controllers/accountControllers.js"

const accountRouter = express.Router()

accountRouter.post("/register", register)
accountRouter.post("/login", login)

export {accountRouter}