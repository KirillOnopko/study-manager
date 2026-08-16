import express from "express"
import {register, login, myAccount} from "../controllers/accountControllers.js"
import { loginDataValidator, registerDataValidator } from "../middleware/validation.js"
import { checkToken } from "../middleware/authorization.js"

const accountRouter = express.Router()

accountRouter.post("/register", registerDataValidator, register)
accountRouter.post("/login", loginDataValidator, login)
accountRouter.get("/me", checkToken, myAccount)

export {accountRouter}